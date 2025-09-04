import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Footer from '../../components/Footer';

const { width } = Dimensions.get('window');

/**
 * VisionMissionScreen - Comprehensive institutional page displaying Vision, Mission, 
 * Core Values, Strategic Objectives, and Commitment for the Etala GAD App at TUP Taguig Campus
 */
export default function VisionMissionScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Transforming Gender Equality</Text>
          <Text style={styles.heroSubtitle}>Through Innovation, Advocacy, and Inclusive Excellence</Text>
          <View style={styles.heroAccent}></View>
        </View>
      </View>

      <View style={styles.contentWrapper}>
        {/* Introduction Section */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Our Commitment to Gender and Development</Text>
          <Text style={styles.introText}>
            At TUP Taguig Campus, we recognize that gender equality is not just a fundamental human right, 
            but a necessary foundation for a prosperous, sustainable, and inclusive academic community. 
            Through the Etala GAD App, we are pioneering a digital transformation in how educational 
            institutions approach gender and development initiatives, creating safer spaces, and 
            empowering every member of our community to thrive regardless of gender identity.
          </Text>
        </View>

        {/* Vision Section */}
        <View style={styles.sectionContainer}>
          <View style={[styles.sectionHeader, styles.visionHeader]}>
            <View style={styles.headerContent}>
              <Text style={styles.sectionIcon}>👁️</Text>
              <Text style={styles.sectionTitle}>Our Vision</Text>
            </View>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.visionCard}>
              <Text style={styles.visionStatement}>
                "A transformative TUP Taguig Campus community that is inclusive, gender-responsive, 
                and empowered, where equality and respect are integral to its culture and practices, 
                enabling all students, faculty, and staff to achieve their full potential."
              </Text>
            </View>
            <View style={styles.visionDetails}>
              <Text style={styles.detailsTitle}>What This Means:</Text>
              <View style={styles.detailsList}>
                <Text style={styles.detailItem}>• Creating an environment where every individual feels valued and respected</Text>
                <Text style={styles.detailItem}>• Ensuring equal opportunities for academic and professional growth</Text>
                <Text style={styles.detailItem}>• Building a culture of inclusivity that celebrates diversity</Text>
                <Text style={styles.detailItem}>• Empowering all community members to reach their highest potential</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Mission Section */}
        <View style={styles.sectionContainer}>
          <View style={[styles.sectionHeader, styles.missionHeader]}>
            <View style={styles.headerContent}>
              <Text style={styles.sectionIcon}>🎯</Text>
              <Text style={styles.sectionTitle}>Our Mission</Text>
            </View>
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.missionIntro}>
              To champion Gender and Development (GAD) through the innovative Etala App platform, 
              serving as a catalyst for positive change and empowerment within our academic community.
            </Text>
            
            <Text style={styles.pillarsTitle}>Our Four Strategic Pillars:</Text>
            
            <View style={styles.missionPillars}>
              <View style={styles.pillarCard}>
                <View style={styles.pillarHeader}>
                  <Text style={styles.pillarIcon}>📢</Text>
                  <Text style={styles.pillarTitle}>Promoting Awareness</Text>
                </View>
                <Text style={styles.pillarDescription}>
                  Providing comprehensive, accessible information on gender equality, women's empowerment, 
                  LGBTQ+ rights, and creating safe spaces. We develop educational resources, conduct 
                  awareness campaigns, and facilitate workshops to build understanding and empathy 
                  across our diverse community.
                </Text>
                <View style={styles.pillarFeatures}>
                  <Text style={styles.featureItem}>• Educational resource library</Text>
                  <Text style={styles.featureItem}>• Interactive workshops and seminars</Text>
                  <Text style={styles.featureItem}>• Community awareness campaigns</Text>
                </View>
              </View>
              
              <View style={styles.pillarCard}>
                <View style={styles.pillarHeader}>
                  <Text style={styles.pillarIcon}>🛡️</Text>
                  <Text style={styles.pillarTitle}>Ensuring Protection</Text>
                </View>
                <Text style={styles.pillarDescription}>
                  Offering a secure, confidential, and user-friendly platform for reporting gender-based 
                  violence, discrimination, and harassment. Our system ensures anonymity, provides 
                  immediate support resources, and connects users with professional counseling services.
                </Text>
                <View style={styles.pillarFeatures}>
                  <Text style={styles.featureItem}>• 24/7 anonymous reporting system</Text>
                  <Text style={styles.featureItem}>• Crisis intervention support</Text>
                  <Text style={styles.featureItem}>• Professional counseling referrals</Text>
                </View>
              </View>
              
              <View style={styles.pillarCard}>
                <View style={styles.pillarHeader}>
                  <Text style={styles.pillarIcon}>🤝</Text>
                  <Text style={styles.pillarTitle}>Fostering Inclusivity</Text>
                </View>
                <Text style={styles.pillarDescription}>
                  Creating a digital environment that celebrates diversity, promotes understanding, 
                  and empowers all genders within our academic community. We facilitate dialogue, 
                  support student organizations, and create platforms for sharing experiences and stories.
                </Text>
                <View style={styles.pillarFeatures}>
                  <Text style={styles.featureItem}>• Inclusive community forums</Text>
                  <Text style={styles.featureItem}>• Diversity celebration events</Text>
                  <Text style={styles.featureItem}>• Peer support networks</Text>
                </View>
              </View>
              
              <View style={styles.pillarCard}>
                <View style={styles.pillarHeader}>
                  <Text style={styles.pillarIcon}>⚡</Text>
                  <Text style={styles.pillarTitle}>Encouraging Participation</Text>
                </View>
                <Text style={styles.pillarDescription}>
                  Mobilizing our entire campus community to actively engage in GAD-related activities, 
                  policy development, and advocacy initiatives. We create opportunities for meaningful 
                  participation and leadership development at all levels.
                </Text>
                <View style={styles.pillarFeatures}>
                  <Text style={styles.featureItem}>• Student leadership programs</Text>
                  <Text style={styles.featureItem}>• Policy consultation forums</Text>
                  <Text style={styles.featureItem}>• Advocacy training workshops</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        {/* Core Values Section */}
        <View style={styles.sectionContainer}>
          <View style={[styles.sectionHeader, styles.valuesHeader]}>
            <View style={styles.headerContent}>
              <Text style={styles.sectionIcon}>⭐</Text>
              <Text style={styles.sectionTitle}>Core Values - ETALA</Text>
            </View>
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.valuesIntro}>
              Our core values form the acronym ETALA, representing the fundamental principles 
              that guide every aspect of our Gender and Development initiatives.
            </Text>
            
            <View style={styles.valuesGrid}>
              <View style={styles.valueCard}>
                <View style={styles.valueHeader}>
                  <View style={styles.valueLetterContainer}>
                    <Text style={styles.valueLetter}>E</Text>
                  </View>
                  <Text style={styles.valueTitle}>Equality</Text>
                </View>
                <Text style={styles.valueDescription}>
                  Ensuring equal rights, opportunities, and treatment for all individuals regardless 
                  of gender, sexual orientation, or identity. We actively work to eliminate barriers 
                  and create level playing fields for everyone in our community.
                </Text>
              </View>
              
              <View style={styles.valueCard}>
                <View style={styles.valueHeader}>
                  <View style={styles.valueLetterContainer}>
                    <Text style={styles.valueLetter}>T</Text>
                  </View>
                  <Text style={styles.valueTitle}>Transparency</Text>
                </View>
                <Text style={styles.valueDescription}>
                  Maintaining open, honest, and clear communication in all our processes, policies, 
                  and decision-making. We believe that transparency builds trust and ensures 
                  accountability in our GAD initiatives.
                </Text>
              </View>
              
              <View style={styles.valueCard}>
                <View style={styles.valueHeader}>
                  <View style={styles.valueLetterContainer}>
                    <Text style={styles.valueLetter}>A</Text>
                  </View>
                  <Text style={styles.valueTitle}>Action</Text>
                </View>
                <Text style={styles.valueDescription}>
                  Taking concrete, measurable steps to address gender-related issues and implement 
                  positive change. We believe in moving beyond words to create tangible impact 
                  through dedicated action and implementation.
                </Text>
              </View>
              
              <View style={styles.valueCard}>
                <View style={styles.valueHeader}>
                  <View style={styles.valueLetterContainer}>
                    <Text style={styles.valueLetter}>L</Text>
                  </View>
                  <Text style={styles.valueTitle}>Leadership</Text>
                </View>
                <Text style={styles.valueDescription}>
                  Developing and empowering leaders at all levels who champion gender equality 
                  and drive positive change. We cultivate leadership skills that promote inclusive 
                  practices and inspire others to action.
                </Text>
              </View>
              
              <View style={styles.valueCard}>
                <View style={styles.valueHeader}>
                  <View style={styles.valueLetterContainer}>
                    <Text style={styles.valueLetter}>A</Text>
                  </View>
                  <Text style={styles.valueTitle}>Advocacy</Text>
                </View>
                <Text style={styles.valueDescription}>
                  Actively promoting and defending the rights of all genders through policy 
                  development, community engagement, and systemic change initiatives. We serve 
                  as voices for the voiceless and champions for justice.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Strategic Objectives Section */}
        <View style={styles.sectionContainer}>
          <View style={[styles.sectionHeader, styles.objectivesHeader]}>
            <View style={styles.headerContent}>
              <Text style={styles.sectionIcon}>🎯</Text>
              <Text style={styles.sectionTitle}>Strategic Objectives</Text>
            </View>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.objectivesList}>
              <View style={styles.objectiveItem}>
                <View style={styles.objectiveNumber}>
                  <Text style={styles.numberText}>01</Text>
                </View>
                <View style={styles.objectiveContent}>
                  <Text style={styles.objectiveTitle}>Digital Innovation in GAD</Text>
                  <Text style={styles.objectiveDesc}>
                    Leverage cutting-edge technology to create accessible, user-friendly digital 
                    solutions that address gender-related challenges in educational settings.
                  </Text>
                </View>
              </View>
              
              <View style={styles.objectiveItem}>
                <View style={styles.objectiveNumber}>
                  <Text style={styles.numberText}>02</Text>
                </View>
                <View style={styles.objectiveContent}>
                  <Text style={styles.objectiveTitle}>Community Engagement</Text>
                  <Text style={styles.objectiveDesc}>
                    Build strong partnerships with students, faculty, staff, and external 
                    organizations to create a comprehensive support network for gender equality initiatives.
                  </Text>
                </View>
              </View>
              
              <View style={styles.objectiveItem}>
                <View style={styles.objectiveNumber}>
                  <Text style={styles.numberText}>03</Text>
                </View>
                <View style={styles.objectiveContent}>
                  <Text style={styles.objectiveTitle}>Policy Integration</Text>
                  <Text style={styles.objectiveDesc}>
                    Integrate gender-responsive policies into all aspects of campus life, 
                    ensuring that GAD principles are embedded in institutional practices and procedures.
                  </Text>
                </View>
              </View>
              
              <View style={styles.objectiveItem}>
                <View style={styles.objectiveNumber}>
                  <Text style={styles.numberText}>04</Text>
                </View>
                <View style={styles.objectiveContent}>
                  <Text style={styles.objectiveTitle}>Continuous Improvement</Text>
                  <Text style={styles.objectiveDesc}>
                    Implement robust monitoring and evaluation systems to assess impact, 
                    gather feedback, and continuously improve our GAD programs and services.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Closing Statement */}
        <View style={styles.closingSection}>
          <Text style={styles.closingTitle}>Our Commitment to You</Text>
          <Text style={styles.closingText}>
            The Etala GAD App represents more than just a technological solution—it embodies our 
            unwavering commitment to creating a campus environment where every individual can thrive, 
            contribute, and succeed. Together, we are building a future where gender equality is not 
            just an aspiration, but a lived reality for all members of our TUP Taguig Campus community.
          </Text>
          <View style={styles.commitmentBadge}>
            <Text style={styles.badgeText}>Empowering • Transforming • Advocating • Leading • Acting</Text>
          </View>
        </View>
      </View>
      
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffff',
  },
  
  // Hero Section
  heroSection: {
    backgroundColor: '#1e1b4b',
    paddingVertical: width < 400 ? 32 : 40,
    paddingHorizontal: width < 400 ? 16 : 20,
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 2,
  },
  heroTitle: {
    fontSize: width < 400 ? 24 : width < 500 ? 28 : 32,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
    lineHeight: width < 400 ? 30 : width < 500 ? 34 : 38,
  },
  heroSubtitle: {
    fontSize: width < 400 ? 16 : 18,
    color: '#a5b4fc',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: width < 400 ? 22 : 26,
    marginBottom: 20,
    paddingHorizontal: width < 400 ? 8 : 0,
  },
  heroAccent: {
    width: 60,
    height: 3,
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  
  // Content Layout
  contentWrapper: {
    paddingHorizontal: width < 400 ? 16 : 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  
  // Introduction Section
  introSection: {
    marginBottom: width < 400 ? 24 : 32,
    paddingHorizontal: 4,
  },
  introTitle: {
    fontSize: width < 400 ? 22 : width < 500 ? 24 : 28,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: width < 400 ? 16 : 20,
    letterSpacing: -0.3,
    lineHeight: width < 400 ? 26 : width < 500 ? 28 : 32,
  },
  introText: {
    fontSize: width < 400 ? 15 : 17,
    lineHeight: width < 400 ? 24 : 28,
    color: '#4b5563',
    textAlign: 'justify',
    fontWeight: '400',
  },
  
  // Section Containers
  sectionContainer: {
    marginBottom: width < 400 ? 24 : 32,
    borderRadius: width < 400 ? 16 : 20,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: width < 400 ? 4 : 8 },
    shadowOpacity: 0.1,
    shadowRadius: width < 400 ? 12 : 24,
    elevation: width < 400 ? 4 : 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  
  sectionHeader: {
    paddingVertical: width < 400 ? 20 : 28,
    paddingHorizontal: width < 400 ? 16 : 24,
  },
  
  headerContent: {
    flexDirection: width < 400 ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  sectionIcon: {
    fontSize: width < 400 ? 24 : 28,
    marginRight: width < 400 ? 0 : 12,
    marginBottom: width < 400 ? 8 : 0,
  },
  
  sectionTitle: { 
    fontSize: width < 400 ? 20 : width < 500 ? 22 : 26, 
    fontWeight: '700', 
    color: '#ffffff', 
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  
  visionHeader: { backgroundColor: '#6366f1' },
  missionHeader: { backgroundColor: '#dc2626' },
  valuesHeader: { backgroundColor: '#1e40af' },
  objectivesHeader: { backgroundColor: '#059669' },
  
  sectionContent: {
    paddingHorizontal: width < 400 ? 16 : 24,
    paddingVertical: width < 400 ? 20 : 32,
  },
  
  // Vision Section
  visionCard: {
    backgroundColor: '#f8fafc',
    padding: width < 400 ? 16 : 24,
    borderRadius: width < 400 ? 12 : 16,
    marginBottom: width < 400 ? 16 : 24,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  visionStatement: {
    fontSize: width < 400 ? 16 : 19,
    lineHeight: width < 400 ? 26 : 32,
    color: '#1e293b',
    fontStyle: 'italic',
    fontWeight: '500',
    textAlign: width < 400 ? 'left' : 'center',
  },
  visionDetails: {
    marginTop: width < 400 ? 16 : 8,
  },
  detailsTitle: {
    fontSize: width < 400 ? 16 : 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: width < 400 ? 12 : 16,
  },
  detailsList: {
    paddingLeft: width < 400 ? 4 : 8,
  },
  detailItem: {
    fontSize: width < 400 ? 14 : 16,
    lineHeight: width < 400 ? 22 : 26,
    color: '#4b5563',
    marginBottom: 6,
  },
  
  // Mission Section
  missionIntro: {
    fontSize: width < 400 ? 16 : 18,
    lineHeight: width < 400 ? 24 : 28,
    color: '#374151',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: width < 400 ? 20 : 32,
    paddingHorizontal: width < 400 ? 0 : 8,
  },
  pillarsTitle: {
    fontSize: width < 400 ? 18 : 22,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: width < 400 ? 20 : 28,
  },
  missionPillars: {
    gap: width < 400 ? 16 : 24,
  },
  pillarCard: {
    backgroundColor: '#fefefe',
    padding: width < 400 ? 16 : 24,
    borderRadius: width < 400 ? 12 : 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pillarHeader: {
    flexDirection: width < 400 ? 'column' : 'row',
    alignItems: width < 400 ? 'flex-start' : 'center',
    marginBottom: width < 400 ? 12 : 16,
  },
  pillarIcon: {
    fontSize: width < 400 ? 20 : 24,
    marginRight: width < 400 ? 0 : 12,
    marginBottom: width < 400 ? 8 : 0,
  },
  pillarTitle: {
    fontSize: width < 400 ? 18 : 20,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
  },
  pillarDescription: {
    fontSize: width < 400 ? 14 : 16,
    lineHeight: width < 400 ? 22 : 26,
    color: '#4b5563',
    marginBottom: width < 400 ? 12 : 16,
    textAlign: 'justify',
  },
  pillarFeatures: {
    paddingTop: width < 400 ? 8 : 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  featureItem: {
    fontSize: width < 400 ? 13 : 14,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  
  // Values Section
  valuesIntro: {
    fontSize: width < 400 ? 15 : 17,
    lineHeight: width < 400 ? 22 : 26,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: width < 400 ? 20 : 32,
    fontWeight: '400',
  },
  valuesGrid: {
    gap: width < 400 ? 12 : 20,
  },
  valueCard: {
    backgroundColor: '#fafafa',
    padding: width < 400 ? 16 : 24,
    borderRadius: width < 400 ? 12 : 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  valueHeader: {
    flexDirection: width < 400 ? 'column' : 'row',
    alignItems: width < 400 ? 'flex-start' : 'center',
    marginBottom: width < 400 ? 12 : 16,
  },
  valueLetterContainer: {
    width: width < 400 ? 40 : 48,
    height: width < 400 ? 40 : 48,
    borderRadius: width < 400 ? 20 : 24,
    backgroundColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width < 400 ? 0 : 16,
    marginBottom: width < 400 ? 8 : 0,
    alignSelf: width < 400 ? 'flex-start' : 'auto',
  },
  valueLetter: {
    fontSize: width < 400 ? 18 : 22,
    fontWeight: '800',
    color: '#ffffff',
  },
  valueTitle: {
    fontSize: width < 400 ? 18 : 20,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
  },
  valueDescription: {
    fontSize: width < 400 ? 14 : 16,
    lineHeight: width < 400 ? 22 : 26,
    color: '#4b5563',
    textAlign: 'justify',
  },
  
  // Objectives Section
  objectivesList: {
    gap: width < 400 ? 16 : 24,
  },
  objectiveItem: {
    flexDirection: width < 400 ? 'column' : 'row',
    alignItems: 'flex-start',
  },
  objectiveNumber: {
    width: width < 400 ? 36 : 48,
    height: width < 400 ? 36 : 48,
    borderRadius: width < 400 ? 18 : 24,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width < 400 ? 0 : 20,
    marginBottom: width < 400 ? 12 : 0,
    marginTop: 4,
    alignSelf: width < 400 ? 'flex-start' : 'auto',
  },
  numberText: {
    fontSize: width < 400 ? 14 : 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  objectiveContent: {
    flex: 1,
  },
  objectiveTitle: {
    fontSize: width < 400 ? 18 : 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: width < 400 ? 6 : 8,
  },
  objectiveDesc: {
    fontSize: width < 400 ? 14 : 16,
    lineHeight: width < 400 ? 22 : 26,
    color: '#4b5563',
    textAlign: 'justify',
  },
  
  // Closing Section
  closingSection: {
    backgroundColor: '#f8fafc',
    padding: width < 400 ? 20 : 32,
    borderRadius: width < 400 ? 16 : 20,
    marginTop: width < 400 ? 12 : 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  closingTitle: {
    fontSize: width < 400 ? 20 : 24,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: width < 400 ? 16 : 20,
    lineHeight: width < 400 ? 24 : 28,
  },
  closingText: {
    fontSize: width < 400 ? 15 : 17,
    lineHeight: width < 400 ? 24 : 28,
    color: '#475569',
    textAlign: 'justify',
    marginBottom: width < 400 ? 20 : 24,
  },
  commitmentBadge: {
    backgroundColor: '#1e293b',
    paddingHorizontal: width < 400 ? 16 : 24,
    paddingVertical: width < 400 ? 8 : 12,
    borderRadius: 50,
  },
  badgeText: {
    fontSize: width < 400 ? 12 : 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});