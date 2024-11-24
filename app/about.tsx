import { StyleSheet, Image, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import Disclaimer from '@/components/Disclaimer';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: any;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Amar Chandra',
    role: 'Developer',
    bio: 'Computer Science student at Northeastern University specializing in AI and User Experience.',
    image: require('../assets/images/team/amar.png'),
  },
  {
    name: 'Mihir Patankar',
    role: 'Developer',
    bio: 'Computer Science student at Northeastern University specializing in mobile development.',
    image: require('../assets/images/team/mihir.png'),
  },
  {
    name: 'Noah Torres',
    role: 'Developer',
    bio: 'Computer Science student at Northeastern University focusing on software development.',
    image: require('../assets/images/team/noah.png'),
  },
  {
    name: 'Bennett Resner',
    role: 'Developer',
    bio: 'Computer Science student at Northeastern University working on mobile app development.',
    image: require('../assets/images/team/bennett.png'),
  },
];

export default function AboutScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>About OASIS</Text>
        <Text style={styles.description}>This app was created for the 2024 Oasis @ NEU cohort</Text>
        <View>
          <Text style={styles.title}>Disclaimer</Text>
          <Disclaimer style={styles.disclaimerText} />
        </View>
        <Text style={styles.title}>Our Team</Text>
        {teamMembers.map((member, index) => (
          <View key={index} style={styles.memberCard}>
            <Image source={member.image} style={styles.memberImage} />
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberRole}>{member.role}</Text>
            <Text style={styles.memberBio}>{member.bio}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 30,
    lineHeight: 24,
  },
  memberCard: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  memberName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  memberRole: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 10,
  },
  memberBio: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
  },
});
