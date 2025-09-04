import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

const isWeb = Platform.OS === 'web';

export default function Footer() {
  return (
    <LinearGradient
      colors={['#1E1B4B', '#0F172A', '#1E293B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.3, 1]}
      style={[
        styles.footer, 
        isWeb && styles.footerWeb
      ]}
    >
      <View style={[styles.sectionContainer, isWeb && styles.sectionContainerWeb]}>
        <View style={[
          styles.footerContent,
          isWeb && styles.footerContentWeb
        ]}>
          {/* Footer Brand */}
          <View style={[styles.footerBrand, isWeb && styles.footerBrandWeb]}>
            <View style={styles.footerLogo}>
              <Ionicons name="shield-checkmark" size={32} color="#8B5CF6" />
              <Text style={[styles.footerBrandText, isWeb && styles.footerBrandTextWeb]}>ETALA</Text>
            </View>
            <Text style={[styles.footerBrandDescription, isWeb && styles.footerBrandDescriptionWeb]}>
              Empowering communities through technology, promoting equality through action.
            </Text>
            <View style={styles.socialLinks}>
              <TouchableOpacity style={styles.socialLink}>
                <Ionicons name="logo-facebook" size={20} color="#8B5CF6" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialLink}>
                <Ionicons name="logo-twitter" size={20} color="#8B5CF6" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialLink}>
                <Ionicons name="logo-linkedin" size={20} color="#8B5CF6" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Links */}
          <View style={[
            styles.footerLinks,
            isWeb && styles.footerLinksWeb
          ]}>
            <View style={styles.footerColumn}>
              <Text style={styles.footerColumnTitle}>Platform</Text>
              <Text style={styles.footerLink}>Features</Text>
              <Text style={styles.footerLink}>Security</Text>
              <Text style={styles.footerLink}>Integrations</Text>
              <Text style={styles.footerLink}>API Docs</Text>
            </View>
            
            <View style={styles.footerColumn}>
              <Text style={styles.footerColumnTitle}>Resources</Text>
              <Text style={styles.footerLink}>Help Center</Text>
              <Text style={styles.footerLink}>Community</Text>
              <Text style={styles.footerLink}>Training</Text>
              <Text style={styles.footerLink}>Blog</Text>
            </View>
            
            <View style={styles.footerColumn}>
              <Text style={styles.footerColumnTitle}>Contact</Text>
              <Text style={styles.footerLink}>support@etala.gov.ph</Text>
              <Text style={styles.footerLink}>+63 (2) 8123-4567</Text>
              <Text style={styles.footerLink}>Emergency: 117</Text>
              <Text style={styles.footerLink}>Women's Crisis: 1366</Text>
            </View>
          </View>
        </View>

        {/* Footer Bottom */}
        <View style={[
          styles.footerBottom,
          isWeb && styles.footerBottomWeb
        ]}>
          <Text style={[styles.footerCopyright, isWeb && styles.footerCopyrightWeb]}>
            © 2025 ETALA. All rights reserved.
          </Text>
          <View style={styles.footerBottomLinks}>
            <Text style={styles.footerBottomLink}>Privacy Policy</Text>
            <Text style={styles.footerSeparator}>•</Text>
            <Text style={styles.footerBottomLink}>Terms of Service</Text>
            <Text style={styles.footerSeparator}>•</Text>
            <Text style={styles.footerBottomLink}>Cookie Policy</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  footer: { 
    paddingVertical: 60 
  },
  footerWeb: { 
    paddingVertical: 100 
  },
  sectionContainer: { 
    paddingHorizontal: 20, 
    maxWidth: 1200, 
    alignSelf: 'center', 
    width: '100%' 
  },
  sectionContainerWeb: { 
    paddingHorizontal: 40 
  },
  footerContent: { 
    gap: 40 
  },
  footerContentWeb: { 
    flexDirection: 'row', 
    gap: 80 
  },
  footerBrand: { 
    marginBottom: 40 
  },
  footerBrandWeb: { 
    flex: 2, 
    marginBottom: 0 
  },
  footerLogo: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    marginBottom: 16 
  },
  footerBrandText: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#FFFFFF', 
    letterSpacing: 1 
  },
  footerBrandTextWeb: { 
    fontSize: 28 
  },
  footerBrandDescription: { 
    fontSize: 14, 
    color: '#E9D5FF', 
    lineHeight: 22, 
    marginBottom: 24, 
    maxWidth: 300 
  },
  footerBrandDescriptionWeb: { 
    fontSize: 16, 
    lineHeight: 26, 
    maxWidth: 400 
  },
  socialLinks: { 
    flexDirection: 'row', 
    gap: 16 
  },
  socialLink: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: 'rgba(196, 181, 253, 0.1)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1.5, 
    borderColor: '#C4B5FD' 
  },
  footerLinks: { 
    flexDirection: 'row', 
    gap: 40, 
    flexWrap: 'wrap' 
  },
  footerLinksWeb: { 
    flex: 3, 
    justifyContent: 'space-between', 
    flexWrap: 'nowrap' 
  },
  footerColumn: { 
    flex: 1, 
    minWidth: 120 
  },
  footerColumnTitle: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: '#FFFFFF', 
    marginBottom: 16, 
    textTransform: 'uppercase', 
    letterSpacing: 0.5 
  },
  footerLink: { 
    fontSize: 14, 
    color: '#E9D5FF', 
    marginBottom: 12, 
    lineHeight: 20 
  },
  footerBottom: { 
    borderTopWidth: 1, 
    borderTopColor: '#4C3B82', 
    paddingTop: 32, 
    marginTop: 40, 
    alignItems: 'center' 
  },
  footerBottomWeb: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  footerCopyright: { 
    fontSize: 12, 
    color: '#C4B5FD', 
    marginBottom: 16, 
    textAlign: 'center' 
  },
  footerCopyrightWeb: { 
    marginBottom: 0 
  },
  footerBottomLinks: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 4 
  },
  footerBottomLink: { 
    fontSize: 12, 
    color: '#E9D5FF' 
  },
  footerSeparator: { 
    fontSize: 12, 
    color: '#C4B5FD', 
    marginHorizontal: 8 
  },
});