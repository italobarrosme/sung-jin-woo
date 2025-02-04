'use client'

import L from 'leaflet'
import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

type RoutingMapProps = {
  pointA: {
    lat: number
    lng: number
  }
  pointB: {
    lat: number
    lng: number
  }
}

export const RoutingMap = ({ pointA, pointB }: RoutingMapProps) => {
  const map = useMap()
  const routingControlRef = useRef<L.Routing.Control | null>(null)
  const routingLayerGroupRef = useRef<L.LayerGroup | null>(null)

  const Icon = L.icon({
    iconUrl: '/placeholder.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -35],
  })

  useEffect(() => {
    if (!map || !pointA || !pointB) return

    // Limpa rota anterior
    if (routingControlRef.current) {
      routingControlRef.current.remove()
      routingControlRef.current = null
    }

    // Remove o grupo de camadas anterior
    if (routingLayerGroupRef.current) {
      routingLayerGroupRef.current.clearLayers()
      map.removeLayer(routingLayerGroupRef.current)
      routingLayerGroupRef.current = null
    }

    // Cria novo grupo de camadas
    const layerGroup = L.layerGroup().addTo(map)
    routingLayerGroupRef.current = layerGroup

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(pointA.lat, pointA.lng),
        L.latLng(pointB.lat, pointB.lng),
      ],
      show: false,
      collapsible: false,
      addWaypoints: false,
      routeWhileDragging: true,
      showAlternatives: true,
      fitSelectedRoutes: true,
      lineOptions: {
        extendToWaypoints: true,
        missingRouteTolerance: 100,
        styles: [{ color: 'hsl(39 100% 50%)', opacity: 0.8, weight: 6 }],
      },
      altLineOptions: {
        extendToWaypoints: true,
        missingRouteTolerance: 100,
        styles: [{ color: 'hsl(0 0% 97.6%)', opacity: 0.4, weight: 4 }],
      },
      createMarker: (i: number, wp: L.Routing.Waypoint) => {
        return L.marker(wp.latLng, {
          icon: Icon,
          draggable: true,
          title: `Ponto ${i + 1}`,
        })
      },
    })

    routingControlRef.current = routingControl
    routingControl.addTo(map)

    routingControl.on('routesfound', (e) => {
      const routes = e.routes
      routes.forEach((route) => {
        if (route.layer) {
          route.layer.addTo(layerGroup)
        }
      })
    })

    return () => {
      if (routingControlRef.current) {
        routingControlRef.current.remove()
        routingControlRef.current = null
      }

      if (routingLayerGroupRef.current) {
        routingLayerGroupRef.current.clearLayers()
        map.removeLayer(routingLayerGroupRef.current)
        routingLayerGroupRef.current = null
      }
    }
  }, [map, pointA, pointB, Icon])

  return null
}
