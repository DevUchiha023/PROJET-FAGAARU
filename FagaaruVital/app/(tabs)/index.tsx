import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import VitalsScreen from '../../features/vitals/VitalsScreen';

export default function TabOneScreen() {
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>{t('welcome')}</Text>
      <VitalsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4caf50',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
