declare module 'leaflet-routing-machine' {
  declare global {
    namespace L {
      namespace Routing {
        interface RoutingControlOptions {
          waypoints: L.LatLng[]
          show?: boolean
          collapsible?: boolean
          addWaypoints?: boolean
          routeWhileDragging?: boolean
          showAlternatives?: boolean
          fitSelectedRoutes?: boolean
          lineOptions?: LineOptions
          altLineOptions?: LineOptions
          createMarker?: (i: number, waypoint: Waypoint, n: number) => L.Marker
        }

        interface LineOptions {
          styles?: L.PathOptions[]
          extendToWaypoints?: boolean
          missingRouteTolerance?: number
        }

        interface Waypoint {
          latLng: L.LatLng
          name?: string
          options?: any
        }

        interface Route {
          layer: L.Layer
          coordinates: L.LatLng[]
          name: string
          summary: { totalDistance: number; totalTime: number }
        }

        interface RoutingEvents {
          routesfound: { routes: Route[] }
        }

        class Control extends L.Control {
          constructor(options: RoutingControlOptions)
          addTo(map: L.Map): this
          remove(): this
          getWaypoints(): Waypoint[]
          setWaypoints(waypoints: L.LatLng[]): this
          spliceWaypoints(
            index: number,
            waypointsToRemove: number,
            ...wayPoints: L.LatLng[]
          ): Waypoint[]
          on<T extends keyof RoutingEvents>(
            event: T,
            handler: (event: RoutingEvents[T]) => void,
          ): this
        }

        function control(options: RoutingControlOptions): Control
      }
    }
  }
}
