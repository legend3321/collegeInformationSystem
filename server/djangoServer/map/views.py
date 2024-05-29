from django.shortcuts import render
from rest_framework.decorators import api_view #type: ignore
from rest_framework.response import Response #type: ignore
from .models import Location
import folium, geocoder 
import mapbox
from math import radians, sin, cos, sqrt, atan2
from geopy.geocoders import Nominatim
import requests
# Create your views here.

@api_view(['GET'])
def get_locations(request):
    locations = Location.objects.all()
    return Response({
        'locations': locations.values()
    })

@api_view(['GET', 'POST'])
def map(request):
    locations = list(Location.objects.all().values('name', 'category', 'latitude', 'longitude'))

    map = folium.Map(
        location=[30.26886, 77.99339],
        zoom_start=17
    )
    for location in locations:
        folium.Marker(
            [location["latitude"], location["longitude"]],
            tooltip=location["name"],
            popup=f'{location["name"]}\n{location["latitude"]}, {location["longitude"]}\n{geocoder.osm(location["name"]).country}'
        ).add_to(map)
    map = map._repr_html_()
    return Response({
        'favorites_json' : locations,
        'map' : str(map)
    })


def haversine_distance(lat1, lon1, lat2, lon2):
    # Convert decimal degrees to radians
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    # Haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    radius = 6371  # Radius of the Earth in kilometers
    distance = radius * c

    return distance

def estimate_walking_time(distance):
    walking_speed = 5  # Average walking speed in km/h
    time_hours = distance / walking_speed
    time_minutes = time_hours * 60
    return time_minutes



def get_mapbox_directions(api_token, origin, destination):
    service = mapbox.Directions(access_token=api_token)
    response = service.directions([origin, destination], profile='mapbox/walking', steps=True)

    if response.status_code == 200:
        directions_list = []
        print(response.geojson()['features'])
        
        
        return response.geojson()['features'][0]
    else:
        # Handle error when directions cannot be retrieved
        return None
    
@api_view(['POST'])
def directions(request):
    walking_distance = None
    walking_duration = None

    source = request.data['source']
    destination = request.data['destination']
    location1 = Location.objects.filter(pk=source).first()
    location2 = Location.objects.filter(pk=destination).first()
    if location1 and location2:
        # Convert coordinates to GeoJSON Point format
        source_coords = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [location1.longitude, location1.latitude]
            }
        }
        destination_coords = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [location2.longitude, location2.latitude]
            }
        }
        
        # Call Mapbox Directions API
        
        
        api_token = 'pk.eyJ1IjoibmF2ZWVuMzEiLCJhIjoiY2xyeWZ6b3J3MTRlazJscGVsdHJhNW52dyJ9.zkLVmB0FRWEvTZnwuh6Yyw'
        # Changes Made by pratyush 

        url = f"https://api.mapbox.com/directions/v5/mapbox/cycling/{location1.longitude},{location1.latitude};{location2.longitude},{location2.latitude}?steps=true&geometries=geojson&access_token={api_token}"
        response = requests.get(url)
        data = response.json()
        
        if 'routes' not in data or not data['routes']:
            raise ValueError("No route found")

        routes = data['routes'][0]['legs'][0]['steps']
        direction_route = []
        for route in routes:
            direction_route.append(route['maneuver']['instruction'])

        data = get_mapbox_directions(api_token, source_coords, destination_coords)
        route_coords = data['geometry']['coordinates']
        r=[(long,lan) for lan,long in route_coords]
        walking_distance = data['properties']['distance']
        if walking_distance > 1000:
            walking_distance = round(walking_distance/1000,2)
        else :
            walking_distance = round(walking_distance)
        walking_duration = round(data['properties']['duration']/60,2)
        map = folium.Map(
            location=[location1.latitude, location1.longitude],
            zoom_start=17
        )



        source_coords = (location1.latitude, location1.longitude)
        destination_coords = (location2.latitude, location2.longitude)
        folium.Marker(
            location=source_coords,
            tooltip=location1.name,
            icon=folium.Icon(color='red')
        ).add_to(map)
        folium.Marker(
            location=destination_coords,
            tooltip=location2.name,
            icon=folium.Icon(color='blue')
        ).add_to(map)

        folium.PolyLine(
            locations=r,
            color='green',
            dash_array='2, 5'  # Adjust the dash pattern as needed
        ).add_to(map)

        # Convert the folium.Map object to its HTML representation
        map = map._repr_html_()

            

    #navigation_history = Navigation.objects.filter(created_by=request.user)
    return Response({
        'map':str(map),
        'walking_distance': walking_distance,
        'walking_duration': walking_duration,
        'source': source,
        'destination': destination,
        'route_instructions': direction_route,
        'route_coords': route_coords,
    })