import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Dimensions,
  Platform,
  FlatList,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Footer from '../components/Footer';


const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;
const isWeb = Platform.OS === 'web';

// Carousel Component
const Carousel = ({ data, autoPlay = false, interval = 3000, showDots = true, imageStyle, containerStyle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={[styles.carouselItem, containerStyle]}>
      <Image 
        source={item.image} 
        style={[styles.carouselImage, imageStyle]}
        resizeMode="cover"
      />
    </View>
  );

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / (width - 40));
    setCurrentIndex(index);
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {showDots && (
        <View style={styles.dotsContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentIndex ? '#8B5CF6' : '#6B7280',
                  width: index === currentIndex ? 12 : 8,
                  height: index === currentIndex ? 12 : 8,
                }
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();

  // Sample image data for carousels (replace with your actual images)
  const featureCarouselData = [
    { image: require('../assets/favicon.png') },
    { image: require('../assets/favicon.png') },
    { image: require('../assets/favicon.png') },
  ];

  const testimonialCarouselData = [
    { image: require('../assets/favicon.png') },
    { image: require('../assets/favicon.png') },
    { image: require('../assets/favicon.png') },
  ];

  const FeatureCard = ({ icon, title, description, color, gradient }) => (
    <View style={[
      styles.featureCard, 
      isTablet && styles.featureCardTablet,
      isWeb && styles.featureCardWeb,
      { shadowColor: color }
    ]}>
      <View style={[styles.featureIconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={isWeb ? 32 : 28} color="white" />
      </View>
      <View style={styles.featureContent}>
        <Text style={[styles.featureTitle, isWeb && styles.featureTitleWeb]}>{title}</Text>
        <Text style={[styles.featureDescription, isWeb && styles.featureDescriptionWeb]}>
          {description}
        </Text>
      </View>
      <View style={[styles.featureGlow, { backgroundColor: color }]} />
    </View>
  );

  const StepCard = ({ step, title, description, icon, color }) => (
    <View style={[
      styles.stepCard, 
      isTablet && styles.stepCardTablet,
      isWeb && styles.stepCardWeb
    ]}>
      <View style={styles.stepHeader}>
        <View style={[styles.stepNumber, { backgroundColor: color }]}>
          <Text style={styles.stepNumberText}>{step}</Text>
        </View>
        <View style={[styles.stepIconBg, { backgroundColor: `${color}15` }]}>
          <Ionicons name={icon} size={isWeb ? 36 : 32} color={color} />
        </View>
      </View>
      <Text style={[styles.stepTitle, isWeb && styles.stepTitleWeb]}>{title}</Text>
      <Text style={[styles.stepDescription, isWeb && styles.stepDescriptionWeb]}>
        {description}
      </Text>
    </View>
  );

  const TestimonialCard = ({ quote, author, role, avatar }) => (
    <View style={[
      styles.testimonialCard, 
      isTablet && styles.testimonialCardTablet,
      isWeb && styles.testimonialCardWeb
    ]}>
      <View style={styles.testimonialHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{avatar}</Text>
        </View>
        <View style={styles.starsContainer}>
          {[...Array(5)].map((_, i) => (
            <Ionicons key={i} name="star" size={16} color="#F59E0B" />
          ))}
        </View>
      </View>
      <Text style={[styles.testimonialText, isWeb && styles.testimonialTextWeb]}>
        "{quote}"
      </Text>
      <View style={styles.testimonialFooter}>
        <Text style={styles.testimonialAuthor}>{author}</Text>
        <Text style={styles.testimonialRole}>{role}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Hero Section */}
        <View style={[
          styles.heroSection, 
          isTablet && styles.heroSectionTablet,
          isWeb && styles.heroSectionWeb
        ]}>
          <View style={styles.heroBackground}>
            <View style={styles.gradientOverlay} />
            <View style={styles.heroPattern}>
              <View style={[styles.heroCircle1, isWeb && styles.heroCircle1Web]} />
              <View style={[styles.heroCircle2, isWeb && styles.heroCircle2Web]} />
              <View style={[styles.heroCircle3, isWeb && styles.heroCircle3Web]} />
            </View>
          </View>
          
          <View style={[
            styles.heroContent, 
            isTablet && styles.heroContentTablet,
            isWeb && styles.heroContentWeb
          ]}>
            <View style={[
              styles.heroMain,
              isTablet && styles.heroMainTablet,
              isWeb && styles.heroMainWeb
            ]}>
              {/* Logo */}
              <View style={[styles.logoSection, isWeb && styles.logoSectionWeb]}>
                <View style={[styles.logoContainer, isWeb && styles.logoContainerWeb]}>
                  <Ionicons name="shield-checkmark" size={isWeb ? 72 : isTablet ? 64 : 48} color="white" />
                </View>
              </View>

              {/* Hero Text */}
              <View style={[styles.heroText, isWeb && styles.heroTextWeb]}>
                <Text style={[
                  styles.heroTitle, 
                  isTablet && styles.heroTitleTablet,
                  isWeb && styles.heroTitleWeb
                ]}>
                  ETALA
                </Text>
                <Text style={[
                  styles.heroSubtitle, 
                  isTablet && styles.heroSubtitleTablet,
                  isWeb && styles.heroSubtitleWeb
                ]}>
                  Empowering Communities, Promoting Equality
                </Text>
                <Text style={[
                  styles.heroDescription, 
                  isTablet && styles.heroDescriptionTablet,
                  isWeb && styles.heroDescriptionWeb
                ]}>
                  The comprehensive platform transforming Gender and Development initiatives through 
                  secure reporting, resource accessibility, and community engagement for a truly 
                  inclusive society.
                </Text>
                
                {/* Hero Buttons */}
                <View style={[
                  styles.heroButtons, 
                  isTablet && styles.heroButtonsTablet,
                  isWeb && styles.heroButtonsWeb
                ]}>
                  <TouchableOpacity 
                    style={[
                      styles.primaryButton, 
                      isTablet && styles.primaryButtonTablet,
                      isWeb && styles.primaryButtonWeb
                    ]} 
                    onPress={() => navigation.navigate("Signup")}
                  >
                    <Ionicons name="rocket" size={20} color="white" />
                    <Text style={[styles.primaryButtonText, isWeb && styles.primaryButtonTextWeb]}>
                      Get Started Free
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.secondaryButton, 
                      isTablet && styles.secondaryButtonTablet,
                      isWeb && styles.secondaryButtonWeb
                    ]} 
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Ionicons name="play" size={18} color="#8B5CF6" />
                    <Text style={[styles.secondaryButtonText, isWeb && styles.secondaryButtonTextWeb]}>
                      Watch Demo
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Trust Indicators */}
                <View style={[styles.trustIndicators, isWeb && styles.trustIndicatorsWeb]}>
                  <View style={styles.trustItem}>
                    <Ionicons name="shield-checkmark" size={16} color="#10B981" />
                    <Text style={styles.trustText}>SOC 2 Compliant</Text>
                  </View>
                  <View style={styles.trustItem}>
                    <Ionicons name="lock-closed" size={16} color="#10B981" />
                    <Text style={styles.trustText}>End-to-End Encrypted</Text>
                  </View>
                  <View style={styles.trustItem}>
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <Text style={styles.trustText}>4.9/5 Rating</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Hero Stats */}
            <View style={[
              styles.heroStats,
              isWeb && styles.heroStatsWeb
            ]}>
              <View style={[styles.statItem, isWeb && styles.statItemWeb]}>
                <Text style={[styles.statNumber, isWeb && styles.statNumberWeb]}>10K+</Text>
                <Text style={[styles.statLabel, isWeb && styles.statLabelWeb]}>Active Users</Text>
              </View>
              <View style={[styles.statItem, isWeb && styles.statItemWeb]}>
                <Text style={[styles.statNumber, isWeb && styles.statNumberWeb]}>95%</Text>
                <Text style={[styles.statLabel, isWeb && styles.statLabelWeb]}>Resolution Rate</Text>
              </View>
              <View style={[styles.statItem, isWeb && styles.statItemWeb]}>
                <Text style={[styles.statNumber, isWeb && styles.statNumberWeb]}>24/7</Text>
                <Text style={[styles.statLabel, isWeb && styles.statLabelWeb]}>Support</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={[
          styles.featuresSection, 
          isTablet && styles.featuresSectionTablet,
          isWeb && styles.featuresSectionWeb
        ]}>
          <View style={[styles.sectionContainer, isWeb && styles.sectionContainerWeb]}>
            <View style={styles.sectionHeader}>
              <Text style={[
                styles.sectionBadge,
                isWeb && styles.sectionBadgeWeb
              ]}>
                FEATURES
              </Text>
              <Text style={[
                styles.sectionTitle, 
                isWeb && styles.sectionTitleWeb
              ]}>
                Everything you need to make an impact
              </Text>
              <Text style={[
                styles.sectionDescription,
                isWeb && styles.sectionDescriptionWeb
              ]}>
                Powerful tools designed specifically for Gender and Development initiatives
              </Text>
            </View>
            
            {/* Feature Carousel */}
            <Carousel 
              data={featureCarouselData}
              autoPlay={true}
              interval={4000}
              imageStyle={isWeb ? styles.featureCarouselImageWeb : styles.featureCarouselImage}
              containerStyle={isWeb ? styles.featureCarouselContainerWeb : styles.featureCarouselContainer}
            />
            
            <View style={[
              styles.featuresGrid, 
              isTablet && styles.featuresGridTablet,
              isWeb && styles.featuresGridWeb
            ]}>
              <FeatureCard 
                icon="shield-checkmark"
                title="Secure Reporting"
                description="Military-grade encryption ensures complete privacy and confidentiality for all incident reports"
                color="#EF4444"
              />
              <FeatureCard 
                icon="library"
                title="Resource Hub"
                description="Access comprehensive databases of laws, policies, guidelines, and emergency contacts instantly"
                color="#3B82F6"
              />
              <FeatureCard 
                icon="people"
                title="Community Platform"
                description="Connect with advocates, join discussions, and participate in training programs and events"
                color="#8B5CF6"
              />
              <FeatureCard 
                icon="analytics"
                title="Impact Analytics"
                description="Track progress, measure outcomes, and generate detailed reports on community engagement"
                color="#10B981"
              />
            </View>
          </View>
        </View>

        {/* How It Works */}
        <View style={[
          styles.stepsSection, 
          isTablet && styles.stepsSectionTablet,
          isWeb && styles.stepsSectionWeb
        ]}>
          <View style={[styles.sectionContainer, isWeb && styles.sectionContainerWeb]}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionBadge, isWeb && styles.sectionBadgeWeb]}>
                HOW IT WORKS
              </Text>
              <Text style={[styles.sectionTitle, isWeb && styles.sectionTitleWeb]}>
                Get started in minutes
              </Text>
            </View>
            
            <View style={[
              styles.stepsGrid, 
              isTablet && styles.stepsGridTablet,
              isWeb && styles.stepsGridWeb
            ]}>
              <StepCard 
                step="1"
                icon="person-add"
                title="Quick Registration"
                description="Create your secure account with verified identity protection in under 2 minutes"
                color="#EF4444"
              />
              <StepCard 
                step="2"
                icon="document-text"
                title="Report or Browse"
                description="Submit confidential reports or explore our comprehensive resource library"
                color="#3B82F6"
              />
              <StepCard 
                step="3"
                icon="heart"
                title="Get Connected"
                description="Receive immediate support, referrals, and connect with your local community"
                color="#8B5CF6"
              />
            </View>
          </View>
        </View>

        {/* Social Proof */}
        <View style={[
          styles.testimonialsSection, 
          isTablet && styles.testimonialsSectionTablet,
          isWeb && styles.testimonialsSectionWeb
        ]}>
          <View style={[styles.sectionContainer, isWeb && styles.sectionContainerWeb]}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionBadge, isWeb && styles.sectionBadgeWeb]}>
                TESTIMONIALS
              </Text>
              <Text style={[styles.sectionTitle, isWeb && styles.sectionTitleWeb]}>
                Trusted by thousands nationwide
              </Text>
            </View>
            
            {/* Testimonial Carousel */}
            <Carousel 
              data={testimonialCarouselData}
              autoPlay={true}
              interval={5000}
              imageStyle={isWeb ? styles.testimonialCarouselImageWeb : styles.testimonialCarouselImage}
              containerStyle={isWeb ? styles.testimonialCarouselContainerWeb : styles.testimonialCarouselContainer}
            />
            
            <View style={[
              styles.testimonialsGrid,
              isWeb && styles.testimonialsGridWeb
            ]}>
              <TestimonialCard 
                quote="ETALA transformed how our community handles GAD initiatives. The platform is intuitive, secure, and truly makes a difference."
                author="Maria Santos"
                role="Community Leader"
                avatar="MS"
              />
              <TestimonialCard 
                quote="As a local official, this platform revolutionized our approach to gender equality. The analytics help us make data-driven decisions."
                author="Hon. Juan Dela Cruz"
                role="Barangay Captain"
                avatar="JC"
              />
              <TestimonialCard 
                quote="The secure reporting gave me courage to speak up. The community support I received was invaluable during my healing journey."
                author="Sarah M."
                role="Community Member"
                avatar="SM"
              />
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={[
          styles.ctaSection, 
          isTablet && styles.ctaSectionTablet,
          isWeb && styles.ctaSectionWeb
        ]}>
          <View style={[styles.sectionContainer, isWeb && styles.sectionContainerWeb]}>
            <View style={styles.ctaContent}>
              <Text style={[
                styles.ctaTitle, 
                isTablet && styles.ctaTitleTablet,
                isWeb && styles.ctaTitleWeb
              ]}>
                Ready to transform your community?
              </Text>
              <Text style={[
                styles.ctaDescription,
                isWeb && styles.ctaDescriptionWeb
              ]}>
                Join thousands of advocates building a more inclusive and equitable society.
              </Text>
              <View style={[
                styles.ctaButtons,
                isWeb && styles.ctaButtonsWeb
              ]}>
                <TouchableOpacity 
                  style={[
                    styles.ctaPrimaryButton,
                    isWeb && styles.ctaPrimaryButtonWeb
                  ]}
                  onPress={() => navigation.navigate("Signup")}
                >
                  <Ionicons name="rocket" size={20} color="white" />
                  <Text style={[styles.ctaPrimaryButtonText, isWeb && styles.ctaPrimaryButtonTextWeb]}>
                    Start Free Today
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.ctaSecondaryButton,
                    isWeb && styles.ctaSecondaryButtonWeb
                  ]}
                  onPress={() => navigation.navigate("Signup")}
                >
                  <Ionicons name="calendar" size={20} color="#8B5CF6" />
                  <Text style={[styles.ctaSecondaryButtonText, isWeb && styles.ctaSecondaryButtonTextWeb]}>
                    Schedule Demo
                  </Text>
                </TouchableOpacity>
              </View>
              
              <Text style={[styles.ctaNote, isWeb && styles.ctaNoteWeb]}>
                No credit card required • Setup in 5 minutes • Cancel anytime
              </Text>
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2D1B69' },
  scrollView: { flex: 1 },
  carouselContainer: { marginBottom: 20 },
  carouselItem: { width: width - 40, marginHorizontal: 20, borderRadius: 12, overflow: 'hidden' },
  carouselImage: { width: '100%', height: 160, borderRadius: 12 },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12, gap: 6 },
  dot: { borderRadius: 4 },
  featureCarouselContainer: { marginBottom: 32, borderRadius: 16, overflow: 'hidden' },
  featureCarouselContainerWeb: { marginBottom: 48, borderRadius: 20 },
  featureCarouselImage: { height: 180 },
  featureCarouselImageWeb: { height: 240 },
  testimonialCarouselContainer: { marginBottom: 32, borderRadius: 16, overflow: 'hidden' },
  testimonialCarouselContainerWeb: { marginBottom: 48, borderRadius: 20 },
  testimonialCarouselImage: { height: 140 },
  testimonialCarouselImageWeb: { height: 200 },
  sectionContainer: { paddingHorizontal: 20, maxWidth: 1000, alignSelf: 'center', width: '100%' },
  sectionContainerWeb: { paddingHorizontal: 32 },
  sectionHeader: { alignItems: 'center', marginBottom: 36 },
  sectionBadge: { fontSize: 11, fontWeight: '600', color: '#C4B5FD', letterSpacing: 1, marginBottom: 12, textTransform: 'uppercase' },
  sectionBadgeWeb: { fontSize: 12 },
  sectionTitle: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', marginBottom: 12, letterSpacing: -0.3, lineHeight: 30 },
  sectionTitleWeb: { fontSize: 36, lineHeight: 42 },
  sectionDescription: { fontSize: 15, color: '#E9D5FF', textAlign: 'center', lineHeight: 22, maxWidth: 500 },
  sectionDescriptionWeb: { fontSize: 18, lineHeight: 26, maxWidth: 600 },
  heroSection: { minHeight: height * 0.85, position: 'relative', overflow: 'hidden' },
  heroSectionTablet: { minHeight: height * 0.8 },
  heroSectionWeb: { minHeight: '90vh' },
  heroBackground: { position: 'absolute', width: '100%', height: '100%', backgroundColor: '#2D1B69' },
  gradientOverlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(196, 181, 253, 0.1)' },
  heroPattern: { position: 'absolute', width: '100%', height: '100%' },
  heroCircle1: { position: 'absolute', width: 320, height: 320, borderRadius: 160, backgroundColor: '#C4B5FD', opacity: 0.12, top: -80, right: -80 },
  heroCircle1Web: { width: 480, height: 480, borderRadius: 240, top: -160, right: -160 },
  heroCircle2: { position: 'absolute', width: 240, height: 240, borderRadius: 120, backgroundColor: '#FCA5A5', opacity: 0.1, bottom: 80, left: -80 },
  heroCircle2Web: { width: 320, height: 320, borderRadius: 160, bottom: 120, left: -120 },
  heroCircle3: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: '#93C5FD', opacity: 0.1, top: '40%', right: -40 },
  heroCircle3Web: { width: 280, height: 280, borderRadius: 140, top: '30%', right: -80 },
  heroContent: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 32, zIndex: 1 },
  heroContentTablet: { paddingHorizontal: 32 },
  heroContentWeb: { paddingHorizontal: 32, maxWidth: 1000, alignSelf: 'center', width: '100%' },
  heroMain: { alignItems: 'center', marginBottom: 32 },
  heroMainTablet: { marginBottom: 48 },
  heroMainWeb: { marginBottom: 60 },
  logoSection: { marginBottom: 24 },
  logoSectionWeb: { marginBottom: 32 },
  logoContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(196, 181, 253, 0.2)', borderWidth: 2, borderColor: '#C4B5FD', justifyContent: 'center', alignItems: 'center', shadowColor: '#C4B5FD', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  logoContainerWeb: { width: 88, height: 88, borderRadius: 44 },
  heroText: { alignItems: 'center', maxWidth: 700 },
  heroTextWeb: { maxWidth: 800 },
  heroTitle: { fontSize: 42, fontWeight: '800', color: '#FFFFFF', letterSpacing: 3, marginBottom: 12, textAlign: 'center', textShadowColor: 'rgba(196, 181, 253, 0.3)', textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 4 },
  heroTitleTablet: { fontSize: 56 },
  heroTitleWeb: { fontSize: 72, letterSpacing: 4 },
  heroSubtitle: { fontSize: 16, fontWeight: '600', color: '#C4B5FD', marginBottom: 20, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.8 },
  heroSubtitleTablet: { fontSize: 18 },
  heroSubtitleWeb: { fontSize: 20, letterSpacing: 1.5 },
  heroDescription: { fontSize: 15, color: '#F3F4F6', textAlign: 'center', lineHeight: 24, marginBottom: 32, maxWidth: 520 },
  heroDescriptionTablet: { fontSize: 16, lineHeight: 26 },
  heroDescriptionWeb: { fontSize: 18, lineHeight: 28, maxWidth: 600 },
  heroButtons: { flexDirection: 'row', gap: 12, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' },
  heroButtonsTablet: { gap: 16 },
  heroButtonsWeb: { gap: 20, marginBottom: 48 },
  primaryButton: { backgroundColor: '#F87171', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 6, shadowColor: '#F87171', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 },
  primaryButtonTablet: { paddingVertical: 16, paddingHorizontal: 32 },
  primaryButtonWeb: { paddingVertical: 18, paddingHorizontal: 36, borderRadius: 12 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  primaryButtonTextWeb: { fontSize: 16 },
  secondaryButton: { backgroundColor: 'rgba(147, 197, 253, 0.12)', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10, borderWidth: 1.5, borderColor: '#93C5FD', flexDirection: 'row', alignItems: 'center', gap: 6 },
  secondaryButtonTablet: { paddingVertical: 16, paddingHorizontal: 32 },
  secondaryButtonWeb: { paddingVertical: 18, paddingHorizontal: 36, borderRadius: 12 },
  secondaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  secondaryButtonTextWeb: { fontSize: 16 },
  trustIndicators: { flexDirection: 'row', gap: 20, flexWrap: 'wrap', justifyContent: 'center' },
  trustIndicatorsWeb: { gap: 24 },
  trustItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  trustText: { fontSize: 11, color: '#E9D5FF', fontWeight: '500' },
  heroStats: { flexDirection: 'row', justifyContent: 'space-between', maxWidth: 320, alignSelf: 'center', gap: 16 },
  heroStatsWeb: { maxWidth: 480, gap: 32 },
  statItem: { alignItems: 'center', flex: 1 },
  statItemWeb: { flex: 1 },
  statNumber: { fontSize: 20, fontWeight: '700', color: '#C4B5FD', marginBottom: 3 },
  statNumberWeb: { fontSize: 24 },
  statLabel: { fontSize: 11, color: '#E9D5FF', textAlign: 'center', fontWeight: '500' },
  statLabelWeb: { fontSize: 12 },
  featuresSection: { backgroundColor: '#3B2C6B', paddingVertical: 64 },
  featuresSectionTablet: { paddingVertical: 80 },
  featuresSectionWeb: { paddingVertical: 96 },
  featuresGrid: { gap: 20 },
  featuresGridTablet: { flexDirection: 'row', flexWrap: 'wrap', gap: 24 },
  featuresGridWeb: { flexDirection: 'row', flexWrap: 'wrap', gap: 32 },
  featureCard: { backgroundColor: '#4C3B82', borderRadius: 16, padding: 24, position: 'relative', overflow: 'hidden', shadowColor: '#000000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5, borderWidth: 1, borderColor: 'rgba(196, 181, 253, 0.15)' },
  featureCardTablet: { flex: 1, minWidth: '45%', maxWidth: '48%' },
  featureCardWeb: { flex: 1, minWidth: '45%', maxWidth: '48%', padding: 32 },
  featureIconContainer: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginBottom: 20, shadowColor: 'inherit', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 3 },
  featureContent: { flex: 1 },
  featureTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF', marginBottom: 10 },
  featureTitleWeb: { fontSize: 20 },
  featureDescription: { fontSize: 13, color: '#E9D5FF', lineHeight: 20 },
  featureDescriptionWeb: { fontSize: 15, lineHeight: 22 },
  featureGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: 2, opacity: 0.5 },
  stepsSection: { backgroundColor: '#2D1B69', paddingVertical: 64 },
  stepsSectionTablet: { paddingVertical: 80 },
  stepsSectionWeb: { paddingVertical: 96 },
  stepsGrid: { gap: 24 },
  stepsGridTablet: { flexDirection: 'row', justifyContent: 'space-between', gap: 32 },
  stepsGridWeb: { flexDirection: 'row', justifyContent: 'space-between', gap: 40 },
  stepCard: { backgroundColor: '#4C3B82', borderRadius: 20, padding: 24, alignItems: 'center', shadowColor: '#000000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 6, borderWidth: 1, borderColor: 'rgba(196, 181, 253, 0.1)' },
  stepCardTablet: { flex: 1 },
  stepCardWeb: { flex: 1, padding: 32 },
  stepHeader: { alignItems: 'center', marginBottom: 20 },
  stepNumber: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 12, shadowColor: 'inherit', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, elevation: 2 },
  stepNumberText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  stepIconBg: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center' },
  stepTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF', marginBottom: 10, textAlign: 'center' },
  stepTitleWeb: { fontSize: 20 },
  stepDescription: { fontSize: 13, color: '#E9D5FF', textAlign: 'center', lineHeight: 20 },
  stepDescriptionWeb: { fontSize: 15, lineHeight: 22 },
  testimonialsSection: { backgroundColor: '#3B2C6B', paddingVertical: 64 },
  testimonialsSectionTablet: { paddingVertical: 80 },
  testimonialsSectionWeb: { paddingVertical: 96 },
  testimonialsGrid: { gap: 20 },
  testimonialsGridWeb: { flexDirection: 'row', gap: 24 },
  testimonialCard: { backgroundColor: '#4C3B82', borderRadius: 16, padding: 24, shadowColor: '#000000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5, borderWidth: 1, borderColor: 'rgba(196, 181, 253, 0.1)' },
  testimonialCardTablet: { width: width * 0.8 },
  testimonialCardWeb: { flex: 1, padding: 32 },
  testimonialHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  avatarContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#C4B5FD', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  starsContainer: { flexDirection: 'row', gap: 1 },
  testimonialText: { fontSize: 14, color: '#F3F4F6', lineHeight: 22, marginBottom: 20, fontStyle: 'italic' },
  testimonialTextWeb: { fontSize: 16, lineHeight: 24 },
  testimonialFooter: { borderTopWidth: 1, borderTopColor: 'rgba(196, 181, 253, 0.15)', paddingTop: 12 },
  testimonialAuthor: { fontSize: 14, fontWeight: '600', color: '#FFFFFF', marginBottom: 3 },
  testimonialRole: { fontSize: 12, color: '#E9D5FF' },
  ctaSection: { backgroundColor: 'rgba(196, 181, 253, 0.08)', paddingVertical: 64 },
  ctaSectionTablet: { paddingVertical: 80 },
  ctaSectionWeb: { paddingVertical: 96 },
  ctaContent: { alignItems: 'center' },
  ctaTitle: { fontSize: 26, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', marginBottom: 16, letterSpacing: -0.3 },
  ctaTitleTablet: { fontSize: 32 },
  ctaTitleWeb: { fontSize: 40 },
  ctaDescription: { fontSize: 15, color: '#F3F4F6', textAlign: 'center', lineHeight: 24, marginBottom: 32, maxWidth: 520 },
  ctaDescriptionWeb: { fontSize: 18, lineHeight: 26, maxWidth: 600 },
  ctaButtons: { flexDirection: 'row', gap: 12, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' },
  ctaButtonsWeb: { gap: 20 },
  ctaPrimaryButton: { backgroundColor: '#F87171', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 6, shadowColor: '#F87171', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 },
  ctaPrimaryButtonWeb: { paddingVertical: 18, paddingHorizontal: 36 },
  ctaSecondaryButton: { backgroundColor: 'rgba(147, 197, 253, 0.1)', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1.5, borderColor: '#93C5FD' },
  ctaSecondaryButtonWeb: { paddingVertical: 18, paddingHorizontal: 36 },
  ctaPrimaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  ctaPrimaryButtonTextWeb: { fontSize: 16 },
  ctaSecondaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  ctaSecondaryButtonTextWeb: { fontSize: 16 },
  ctaNote: { fontSize: 11, color: '#E9D5FF', textAlign: 'center' },
  ctaNoteWeb: { fontSize: 12 },
});