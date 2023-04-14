import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RockPaper from './src/components/RockPaper';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
       <View style={styles.container}>
      <RockPaper/>
      <StatusBar style="auto" />
    </View>
    </SafeAreaProvider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
