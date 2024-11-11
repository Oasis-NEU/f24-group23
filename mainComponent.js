import { registerRootComponent } from 'expo';
import HealthInfo from './health_info'; // Importing HealthInfo component

export default function Main() {
  return <HealthInfo />; // Rendering HealthInfo component
}

registerRootComponent(Main);
