from django.shortcuts import render
from rest_framework.decorators import api_view #type: ignore
from rest_framework.response import Response #type: ignore
from .models import Location, Category
import folium, geocoder 
from geopy.geocoders import Nominatim


# Create your views here.

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


from math import radians, sin, cos, sqrt, atan2
from django.shortcuts import render, get_object_or_404
# from .models import Location, Navigation
# from .forms import NavigationForm

def haversine_distance(lat1, lon1, lat2, lon2):
    """
    Calculate the great-circle distance between two points
    on the Earth's surface given their longitudes and latitudes
    in decimal degrees using the Haversine formula.
    """
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
    """
    Estimate walking time based on the given distance
    and assuming an average walking speed of 5 km/h.
    """
    walking_speed = 5  # Average walking speed in km/h
    time_hours = distance / walking_speed
    time_minutes = time_hours * 60
    return time_minutes

import math

def calculate_angle(p1, p2):
    """
    Calculate the angle between two points.
    """
    x1, y1 = p1
    x2, y2 = p2
    dx = x2 - x1
    dy = y2 - y1
    return math.atan2(dy, dx)

def get_directions(route_coords,destination_coords):
    """
    Generate directions based on the route coordinates.
    """
    directions = []
    for i in range(len(route_coords) - 1):
        angle = calculate_angle(route_coords[i], route_coords[i+1])
        if -math.pi / 4 < angle <= math.pi / 4:
            directions.append("Go straight")
        elif math.pi / 4 < angle <= 3 * math.pi / 4:
            directions.append("Take a left")
        elif -3 * math.pi / 4 < angle <= -math.pi / 4:
            directions.append("Take a right")
        elif angle > 3 * math.pi / 4 or angle <= -3 * math.pi / 4:
            directions.append("Go straight")
    if len(route_coords) >= 2:
        penultimate_point = route_coords[-2]
        last_point = route_coords[-1]
        angle_to_destination = calculate_angle(penultimate_point, last_point)
        angle_to_destination_from_last = calculate_angle(last_point, destination_coords)
        if abs(angle_to_destination - angle_to_destination_from_last) < math.pi / 4:
            directions.append("Your destination is on the left")
        elif abs(angle_to_destination - angle_to_destination_from_last) > 3 * math.pi / 4:
            directions.append("Your destination is on the right")
        else:
            if angle_to_destination < 0:
                directions.append("Your destination is on the right")
            else:
                directions.append("Your destination is on the left")
    return directions

import mapbox

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
    navigation, heading = None, None
    walking_distance = None
    walking_duration = None
    directions_list=[]
    
    map = folium.Map(
        location=[30.26866, 77.99339],
        zoom_start=17
    )
    locations = Location.objects.all()
    for loc in locations:
        folium.Marker(
            [loc.latitude, loc.longitude],
            tooltip=loc.name,
            popup=f'{loc.name}\n{loc.latitude}, {loc.longitude}'
        ).add_to(map)
    map = map._repr_html_()
    location = get_object_or_404(Location, name="Main Block")
    source = None
    destination = None
    form = request.data

    source = form['source']
    destination = form['destination']
    location1 = Location.objects.filter(name=source).first()
    location2 = Location.objects.filter(name=destination).first()
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
        data = get_mapbox_directions(api_token, source_coords, destination_coords)
        route_coords = data['geometry']['coordinates']
        r=[(long,lan) for lan,long in route_coords]
        directions = get_directions(r,r[-1])
        walking_distance = data['properties']['distance']/1000
        walking_duration = round(data['properties']['duration']/60,2)
        for direction in directions:
            directions_list.append(direction)
        map = folium.Map(
            location=[30.26866, 77.99339],
            zoom_start=17
        )
        for loc in locations:
            folium.Marker(
                [loc.latitude, loc.longitude],
                tooltip=loc.name,
                popup=f'{loc.name}\n{loc.latitude}, {loc.longitude}'
            ).add_to(map)
        source_coords = (location1.latitude, location1.longitude)
        destination_coords = (location2.latitude, location2.longitude)
        # Add PolyLine to the map with dash_array to create dotted line effect
        print([source_coords, destination_coords])
        folium.PolyLine(
            locations=r,
            color='red',
            dash_array='5, 5'  # Adjust the dash pattern as needed
        ).add_to(map)

        # Convert the folium.Map object to its HTML representation
        map = map._repr_html_()

            

    #navigation_history = Navigation.objects.filter(created_by=request.user)
    return Response({
        'location' : location,
        'locations':locations,
        'navigation' : navigation,
        'heading' : heading,
        'map':str(map),
        'walking_distance': walking_distance,
        'walking_duration': walking_duration,
        'source': source,
        'destination': destination,
        'directions_list': directions_list if directions_list else None
    })