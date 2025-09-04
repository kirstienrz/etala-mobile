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
  carouselContainer: { marginBottom: 24 },
  carouselItem: { width: width - 40, marginHorizontal: 20, borderRadius: 16, overflow: 'hidden' },
  carouselImage: { width: '100%', height: 200, borderRadius: 16 },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16, gap: 8 },
  dot: { borderRadius: 6 },
  featureCarouselContainer: { marginBottom: 40, borderRadius: 20, overflow: 'hidden' },
  featureCarouselContainerWeb: { marginBottom: 60, borderRadius: 24 },
  featureCarouselImage: { height: 220 },
  featureCarouselImageWeb: { height: 300 },
  testimonialCarouselContainer: { marginBottom: 40, borderRadius: 20, overflow: 'hidden' },
  testimonialCarouselContainerWeb: { marginBottom: 60, borderRadius: 24 },
  testimonialCarouselImage: { height: 180 },
  testimonialCarouselImageWeb: { height: 250 },
  sectionContainer: { paddingHorizontal: 20, maxWidth: 1200, alignSelf: 'center', width: '100%' },
  sectionContainerWeb: { paddingHorizontal: 40 },
  sectionHeader: { alignItems: 'center', marginBottom: 48 },
  sectionBadge: { fontSize: 12, fontWeight: '700', color: '#C4B5FD', letterSpacing: 1.5, marginBottom: 16, textTransform: 'uppercase' },
  sectionBadgeWeb: { fontSize: 14 },
  sectionTitle: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 16, letterSpacing: -0.5, lineHeight: 36 },
  sectionTitleWeb: { fontSize: 48, lineHeight: 56 },
  sectionDescription: { fontSize: 16, color: '#E9D5FF', textAlign: 'center', lineHeight: 24, maxWidth: 600 },
  sectionDescriptionWeb: { fontSize: 20, lineHeight: 28, maxWidth: 700 },
  heroSection: { minHeight: height * 0.9, position: 'relative', overflow: 'hidden' },
  heroSectionTablet: { minHeight: height * 0.85 },
  heroSectionWeb: { minHeight: '100vh' },
  heroBackground: { position: 'absolute', width: '100%', height: '100%', backgroundColor: '#2D1B69' },
  gradientOverlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(196, 181, 253, 0.1)' },
  heroPattern: { position: 'absolute', width: '100%', height: '100%' },
  heroCircle1: { position: 'absolute', width: 400, height: 400, borderRadius: 200, backgroundColor: '#C4B5FD', opacity: 0.15, top: -100, right: -100, transform: [{ scale: 1.2 }] },
  heroCircle1Web: { width: 600, height: 600, borderRadius: 300, top: -200, right: -200 },
  heroCircle2: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: '#FCA5A5', opacity: 0.12, bottom: 100, left: -100 },
  heroCircle2Web: { width: 400, height: 400, borderRadius: 200, bottom: 200, left: -150 },
  heroCircle3: { position: 'absolute', width: 250, height: 250, borderRadius: 125, backgroundColor: '#93C5FD', opacity: 0.12, top: '40%', right: -50 },
  heroCircle3Web: { width: 350, height: 350, borderRadius: 175, top: '30%', right: -100 },
  heroContent: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 40, zIndex: 1 },
  heroContentTablet: { paddingHorizontal: 40 },
  heroContentWeb: { paddingHorizontal: 40, maxWidth: 1200, alignSelf: 'center', width: '100%' },
  heroMain: { alignItems: 'center', marginBottom: 40 },
  heroMainTablet: { marginBottom: 60 },
  heroMainWeb: { marginBottom: 80 },
  logoSection: { marginBottom: 32 },
  logoSectionWeb: { marginBottom: 40 },
  logoContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(196, 181, 253, 0.2)', borderWidth: 2, borderColor: '#C4B5FD', justifyContent: 'center', alignItems: 'center', shadowColor: '#C4B5FD', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  logoContainerWeb: { width: 120, height: 120, borderRadius: 60 },
  heroText: { alignItems: 'center', maxWidth: 800 },
  heroTextWeb: { maxWidth: 900 },
  heroTitle: { fontSize: 52, fontWeight: '900', color: '#FFFFFF', letterSpacing: 4, marginBottom: 16, textAlign: 'center', textShadowColor: 'rgba(196, 181, 253, 0.4)', textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 6 },
  heroTitleTablet: { fontSize: 72 },
  heroTitleWeb: { fontSize: 96, letterSpacing: 6 },
  heroSubtitle: { fontSize: 18, fontWeight: '600', color: '#C4B5FD', marginBottom: 24, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 },
  heroSubtitleTablet: { fontSize: 22 },
  heroSubtitleWeb: { fontSize: 24, letterSpacing: 2 },
  heroDescription: { fontSize: 16, color: '#F3F4F6', textAlign: 'center', lineHeight: 28, marginBottom: 40, maxWidth: 600 },
  heroDescriptionTablet: { fontSize: 18, lineHeight: 32 },
  heroDescriptionWeb: { fontSize: 22, lineHeight: 36, maxWidth: 700 },
  heroButtons: { flexDirection: 'row', gap: 16, marginBottom: 40, flexWrap: 'wrap', justifyContent: 'center' },
  heroButtonsTablet: { gap: 20 },
  heroButtonsWeb: { gap: 24, marginBottom: 60 },
  primaryButton: { backgroundColor: '#F87171', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 8, shadowColor: '#F87171', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 },
  primaryButtonTablet: { paddingVertical: 18, paddingHorizontal: 36 },
  primaryButtonWeb: { paddingVertical: 20, paddingHorizontal: 40, borderRadius: 16 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  primaryButtonTextWeb: { fontSize: 18 },
  secondaryButton: { backgroundColor: 'rgba(147, 197, 253, 0.12)', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 12, borderWidth: 1.5, borderColor: '#93C5FD', flexDirection: 'row', alignItems: 'center', gap: 8 },
  secondaryButtonTablet: { paddingVertical: 18, paddingHorizontal: 36 },
  secondaryButtonWeb: { paddingVertical: 20, paddingHorizontal: 40, borderRadius: 16 },
  secondaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  secondaryButtonTextWeb: { fontSize: 18 },
  trustIndicators: { flexDirection: 'row', gap: 24, flexWrap: 'wrap', justifyContent: 'center' },
  trustIndicatorsWeb: { gap: 32 },
  trustItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  trustText: { fontSize: 12, color: '#E9D5FF', fontWeight: '500' },
  heroStats: { flexDirection: 'row', justifyContent: 'space-between', maxWidth: 400, alignSelf: 'center', gap: 20 },
  heroStatsWeb: { maxWidth: 600, gap: 40 },
  statItem: { alignItems: 'center', flex: 1 },
  statItemWeb: { flex: 1 },
  statNumber: { fontSize: 24, fontWeight: '800', color: '#C4B5FD', marginBottom: 4 },
  statNumberWeb: { fontSize: 32 },
  statLabel: { fontSize: 12, color: '#E9D5FF', textAlign: 'center', fontWeight: '500' },
  statLabelWeb: { fontSize: 14 },
  featuresSection: { backgroundColor: '#3B2C6B', paddingVertical: 80 },
  featuresSectionTablet: { paddingVertical: 100 },
  featuresSectionWeb: { paddingVertical: 120 },
  featuresGrid: { gap: 24 },
  featuresGridTablet: { flexDirection: 'row', flexWrap: 'wrap', gap: 32 },
  featuresGridWeb: { flexDirection: 'row', flexWrap: 'wrap', gap: 40 },
  featureCard: { backgroundColor: '#4C3B82', borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden', shadowColor: '#000000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6, borderWidth: 1, borderColor: 'rgba(196, 181, 253, 0.2)' },
  featureCardTablet: { flex: 1, minWidth: '45%', maxWidth: '48%' },
  featureCardWeb: { flex: 1, minWidth: '45%', maxWidth: '48%', padding: 40 },
  featureIconContainer: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 24, shadowColor: 'inherit', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
  featureContent: { flex: 1 },
  featureTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 12 },
  featureTitleWeb: { fontSize: 24 },
  featureDescription: { fontSize: 14, color: '#E9D5FF', lineHeight: 22 },
  featureDescriptionWeb: { fontSize: 16, lineHeight: 26 },
  featureGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: 2, opacity: 0.6 },
  stepsSection: { backgroundColor: '#2D1B69', paddingVertical: 80 },
  stepsSectionTablet: { paddingVertical: 100 },
  stepsSectionWeb: { paddingVertical: 120 },
  stepsGrid: { gap: 32 },
  stepsGridTablet: { flexDirection: 'row', justifyContent: 'space-between', gap: 40 },
  stepsGridWeb: { flexDirection: 'row', justifyContent: 'space-between', gap: 48 },
  stepCard: { backgroundColor: '#4C3B82', borderRadius: 24, padding: 32, alignItems: 'center', shadowColor: '#000000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 8, borderWidth: 1, borderColor: 'rgba(196, 181, 253, 0.12)' },
  stepCardTablet: { flex: 1 },
  stepCardWeb: { flex: 1, padding: 40 },
  stepHeader: { alignItems: 'center', marginBottom: 24 },
  stepNumber: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 16, shadowColor: 'inherit', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 },
  stepNumberText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  stepIconBg: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
  stepTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 12, textAlign: 'center' },
  stepTitleWeb: { fontSize: 24 },
  stepDescription: { fontSize: 14, color: '#E9D5FF', textAlign: 'center', lineHeight: 22 },
  stepDescriptionWeb: { fontSize: 16, lineHeight: 26 },
  testimonialsSection: { backgroundColor: '#3B2C6B', paddingVertical: 80 },
  testimonialsSectionTablet: { paddingVertical: 100 },
  testimonialsSectionWeb: { paddingVertical: 120 },
  testimonialsGrid: { gap: 24 },
  testimonialsGridWeb: { flexDirection: 'row', gap: 32 },
  testimonialCard: { backgroundColor: '#4C3B82', borderRadius: 20, padding: 32, shadowColor: '#000000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 6, borderWidth: 1, borderColor: 'rgba(196, 181, 253, 0.12)' },
  testimonialCardTablet: { width: width * 0.8 },
  testimonialCardWeb: { flex: 1, padding: 40 },
  testimonialHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  avatarContainer: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#C4B5FD', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  starsContainer: { flexDirection: 'row', gap: 2 },
  testimonialText: { fontSize: 16, color: '#F3F4F6', lineHeight: 26, marginBottom: 24, fontStyle: 'italic' },
  testimonialTextWeb: { fontSize: 18, lineHeight: 28 },
  testimonialFooter: { borderTopWidth: 1, borderTopColor: 'rgba(196, 181, 253, 0.2)', paddingTop: 16 },
  testimonialAuthor: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  testimonialRole: { fontSize: 14, color: '#E9D5FF' },
  ctaSection: { backgroundColor: 'rgba(196, 181, 253, 0.08)', paddingVertical: 80 },
  ctaSectionTablet: { paddingVertical: 100 },
  ctaSectionWeb: { paddingVertical: 120 },
  ctaContent: { alignItems: 'center' },
  ctaTitle: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 20, letterSpacing: -0.5 },
  ctaTitleTablet: { fontSize: 40 },
  ctaTitleWeb: { fontSize: 52 },
  ctaDescription: { fontSize: 16, color: '#F3F4F6', textAlign: 'center', lineHeight: 26, marginBottom: 40, maxWidth: 600 },
  ctaDescriptionWeb: { fontSize: 20, lineHeight: 30, maxWidth: 700 },
  ctaButtons: { flexDirection: 'row', gap: 16, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' },
  ctaButtonsWeb: { gap: 24 },
  ctaPrimaryButton: { backgroundColor: '#F87171', paddingVertical: 18, paddingHorizontal: 36, borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 8, shadowColor: '#F87171', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 },
  ctaPrimaryButtonWeb: { paddingVertical: 22, paddingHorizontal: 44 },
  ctaSecondaryButton: { backgroundColor: 'rgba(147, 197, 253, 0.1)', paddingVertical: 18, paddingHorizontal: 36, borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1.5, borderColor: '#93C5FD' },
  ctaSecondaryButtonWeb: { paddingVertical: 22, paddingHorizontal: 44 },
  ctaPrimaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  ctaPrimaryButtonTextWeb: { fontSize: 18 },
  ctaSecondaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  ctaSecondaryButtonTextWeb: { fontSize: 18 },
  ctaNote: { fontSize: 12, color: '#E9D5FF', textAlign: 'center' },
  ctaNoteWeb: { fontSize: 14 },
});