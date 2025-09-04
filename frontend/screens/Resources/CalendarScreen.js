import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Footer from '../../components/Footer';


export default function CalendarScreen() {
  const [selectedMonth, setSelectedMonth] = useState("September");
  const [viewMode, setViewMode] = useState("month"); // month, week, agenda

  const currentDate = new Date();
  const months = [
    "September", "October", "November", "December", 
    "January", "February", "March", "April", "May", "June"
  ];

  const events = [
    {
      id: 1,
      title: "Women in Leadership Summit",
      date: "2024-09-15",
      time: "09:00 AM - 05:00 PM",
      location: "Metro Manila Convention Center",
      type: "conference",
      description: "Annual summit bringing together women leaders from various sectors to share insights and network.",
      program: "Leadership Development",
      status: "confirmed"
    },
    {
      id: 2,
      title: "Gender-Based Violence Prevention Workshop",
      date: "2024-09-22",
      time: "02:00 PM - 06:00 PM",
      location: "Community Center, Quezon City",
      type: "workshop",
      description: "Community workshop focusing on GBV prevention strategies and support mechanisms.",
      program: "GBV Prevention Campaign",
      status: "confirmed"
    },
    {
      id: 3,
      title: "Digital Literacy Training Session",
      date: "2024-09-28",
      time: "10:00 AM - 03:00 PM",
      location: "Technology Hub, Makati",
      type: "training",
      description: "Hands-on training session for women entrepreneurs on digital tools and online business strategies.",
      program: "Digital Gender Equity Initiative",
      status: "confirmed"
    },
    {
      id: 4,
      title: "Climate Resilience Community Forum",
      date: "2024-10-05",
      time: "01:00 PM - 05:00 PM",
      location: "Barangay Hall, Antipolo",
      type: "forum",
      description: "Community discussion on climate adaptation strategies led by women environmental advocates.",
      program: "Climate Change & Gender Resilience",
      status: "confirmed"
    },
    {
      id: 5,
      title: "Economic Empowerment Graduation Ceremony",
      date: "2024-10-12",
      time: "03:00 PM - 06:00 PM",
      location: "City Hall Auditorium",
      type: "ceremony",
      description: "Graduation ceremony for women who completed the economic empowerment program.",
      program: "Economic Empowerment Program",
      status: "confirmed"
    },
    {
      id: 6,
      title: "Youth Gender Awareness Campaign Launch",
      date: "2024-10-18",
      time: "09:00 AM - 12:00 PM",
      location: "University of the Philippines",
      type: "campaign",
      description: "Official launch of the youth-focused gender awareness campaign with student organizations.",
      program: "Youth Gender Leadership",
      status: "confirmed"
    },
    {
      id: 7,
      title: "Women Entrepreneurs Networking Night",
      date: "2024-10-25",
      time: "06:00 PM - 09:00 PM",
      location: "Business District Hotel",
      type: "networking",
      description: "Evening networking event for women entrepreneurs to connect and explore collaboration opportunities.",
      program: "Economic Empowerment Program",
      status: "confirmed"
    },
    {
      id: 8,
      title: "Mental Health & Gender Wellness Seminar",
      date: "2024-11-08",
      time: "02:00 PM - 05:00 PM",
      location: "Medical Center Conference Room",
      type: "seminar",
      description: "Educational seminar on gender-specific mental health challenges and wellness strategies.",
      program: "Mental Health & Gender Wellness",
      status: "planning"
    },
    {
      id: 9,
      title: "International Day for the Elimination of Violence Against Women",
      date: "2024-11-25",
      time: "08:00 AM - 06:00 PM",
      location: "Rizal Park",
      type: "observance",
      description: "Special commemoration with workshops, exhibits, and advocacy activities throughout the day.",
      program: "GBV Prevention Campaign",
      status: "planning"
    },
    {
      id: 10,
      title: "Year-End Impact Assessment Meeting",
      date: "2024-12-15",
      time: "10:00 AM - 04:00 PM",
      location: "Organization Headquarters",
      type: "meeting",
      description: "Comprehensive review of 2024 programs and planning session for 2025 initiatives.",
      program: "All Programs",
      status: "tentative"
    }
  ];

  const getEventsByMonth = (month) => {
    const monthIndex = months.indexOf(month);
    let targetYear = 2024;
    let targetMonth = 9 + monthIndex; // September = 9
    
    if (targetMonth > 12) {
      targetMonth -= 12;
      targetYear = 2025;
    }
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() + 1 === targetMonth && eventDate.getFullYear() === targetYear;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getEventTypeColor = (type) => {
    const colors = {
      conference: "#7c3aed",
      workshop: "#dc2626",
      training: "#1e40af",
      forum: "#059669",
      ceremony: "#ea580c",
      campaign: "#9333ea",
      networking: "#0891b2",
      seminar: "#7c2d12",
      observance: "#be185d",
      meeting: "#374151"
    };
    return colors[type] || "#6b7280";
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "#10b981",
      planning: "#f59e0b",
      tentative: "#8b5cf6"
    };
    return colors[status] || "#6b7280";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= currentDate)
    .slice(0, 3)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gender & Development</Text>
        <Text style={styles.subtitle}>Calendar of Events</Text>
        <Text style={styles.description}>
          Stay connected with our community through workshops, conferences, and advocacy events
        </Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Event Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{events.length}</Text>
            <Text style={styles.statLabel}>Total Events</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{upcomingEvents.length}</Text>
            <Text style={styles.statLabel}>Next 30 Days</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {events.reduce((sum, event) => sum + event.attendees, 0).toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Expected Attendees</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {[...new Set(events.map(e => e.program))].length}
            </Text>
            <Text style={styles.statLabel}>Programs Involved</Text>
          </View>
        </View>
      </View>

      {/* Upcoming Events Highlight */}
      <View style={styles.upcomingContainer}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {upcomingEvents.map((event) => (
          <View key={event.id} style={styles.upcomingEventCard}>
            <View style={styles.eventDateBadge}>
              <Text style={styles.eventDay}>{new Date(event.date).getDate()}</Text>
              <Text style={styles.eventMonth}>
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
              </Text>
            </View>
            <View style={styles.upcomingEventContent}>
              <Text style={styles.upcomingEventTitle}>{event.title}</Text>
              <Text style={styles.upcomingEventTime}>{event.time}</Text>
              <Text style={styles.upcomingEventLocation}>{event.location}</Text>
              <View style={styles.upcomingEventMeta}>
                <View style={[styles.eventTypeBadge, { backgroundColor: getEventTypeColor(event.type) }]}>
                  <Text style={styles.eventTypeText}>{event.type.toUpperCase()}</Text>
                </View>
                <Text style={styles.attendeeCount}>{event.attendees} attendees</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* View Mode Selector */}
      <View style={styles.viewModeContainer}>
        <Text style={styles.sectionTitle}>Calendar View</Text>
        <View style={styles.viewModeButtons}>
          {["month", "agenda"].map((mode) => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.viewModeButton,
                { backgroundColor: viewMode === mode ? "#7c3aed" : "#f3f4f6" }
              ]}
              onPress={() => setViewMode(mode)}
            >
              <Text style={[
                styles.viewModeText,
                { color: viewMode === mode ? "#ffffff" : "#374151" }
              ]}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)} View
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Month Selector */}
      {viewMode === "month" && (
        <View style={styles.monthContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthScroll}>
            {months.map((month) => (
              <TouchableOpacity
                key={month}
                style={[
                  styles.monthButton,
                  { backgroundColor: selectedMonth === month ? "#dc2626" : "#ffffff" }
                ]}
                onPress={() => setSelectedMonth(month)}
              >
                <Text style={[
                  styles.monthText,
                  { color: selectedMonth === month ? "#ffffff" : "#374151" }
                ]}>
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Events Display */}
      <View style={styles.eventsContainer}>
        <Text style={styles.sectionTitle}>
          {viewMode === "month" ? `${selectedMonth} Events` : "All Events"}
        </Text>
        {(viewMode === "month" ? getEventsByMonth(selectedMonth) : events).map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <View style={styles.eventTitleContainer}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventBadges}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(event.status) }]}>
                    <Text style={styles.badgeText}>{event.status.toUpperCase()}</Text>
                  </View>
                  <View style={[styles.typeBadge, { backgroundColor: getEventTypeColor(event.type) }]}>
                    <Text style={styles.badgeText}>{event.type.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
            </View>

            <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
            <Text style={styles.eventTime}>{event.time}</Text>
            <Text style={styles.eventLocation}>📍 {event.location}</Text>
            
            <Text style={styles.eventDescription}>{event.description}</Text>
            
            <View style={styles.eventFooter}>
              <Text style={styles.eventProgram}>Program: {event.program}</Text>
            </View>
          </View>
        ))}
        
        {(viewMode === "month" ? getEventsByMonth(selectedMonth) : events).length === 0 && (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No events scheduled for {selectedMonth}</Text>
            <Text style={styles.noEventsSubtext}>Check other months or contact us for updates</Text>
          </View>
        )}
      </View>

      {/* Event Types Legend */}
      <View style={styles.legendContainer}>
        <Text style={styles.sectionTitle}>Event Types</Text>
        <View style={styles.legendGrid}>
          {Object.entries({
            conference: "Large-scale professional gatherings",
            workshop: "Hands-on skill-building sessions",
            training: "Educational and capacity building",
            forum: "Community discussions and dialogues",
            ceremony: "Recognition and celebration events",
            campaign: "Advocacy and awareness initiatives",
            networking: "Professional connection events",
            seminar: "Educational presentations",
            observance: "Special commemorative events",
            meeting: "Planning and coordination sessions"
          }).map(([type, description]) => (
            <View key={type} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: getEventTypeColor(type) }]} />
              <View style={styles.legendContent}>
                <Text style={styles.legendType}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                <Text style={styles.legendDescription}>{description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.contactContainer}>
        <Text style={styles.sectionTitle}>Event Information</Text>
        <Text style={styles.contactText}>
          For event registration, updates, or inquiries, please contact our events coordination team.
        </Text>
        <View style={styles.contactDetails}>
          <Text style={styles.contactItem}>📧 events@genderdev.org.ph</Text>
          <Text style={styles.contactItem}>📞 +63 2 8123 4567</Text>
          <Text style={styles.contactItem}>💬 Follow us on social media for real-time updates</Text>
        </View>
      </View>
            <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#7c3aed",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: "#e0e7ff",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#c7d2fe",
    textAlign: "center",
    lineHeight: 22,
  },
  statsContainer: {
    padding: 20,
    backgroundColor: "#fef2f2",
    margin: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#dc2626",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#dc2626",
    marginBottom: 15,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#ffffff",
    width: "48%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#dc2626",
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7c3aed",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  upcomingContainer: {
    padding: 20,
    backgroundColor: "#dbeafe",
    margin: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  upcomingEventCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    elevation: 2,
  },
  eventDateBadge: {
    backgroundColor: "#7c3aed",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    minWidth: 60,
  },
  eventDay: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  eventMonth: {
    fontSize: 12,
    color: "#e0e7ff",
    fontWeight: "600",
  },
  upcomingEventContent: {
    flex: 1,
  },
  upcomingEventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 4,
  },
  upcomingEventTime: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  upcomingEventLocation: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  upcomingEventMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eventTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  eventTypeText: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "600",
  },
  attendeeCount: {
    fontSize: 12,
    color: "#6b7280",
  },
  viewModeContainer: {
    padding: 20,
  },
  viewModeButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  viewModeButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 2,
  },
  viewModeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  monthContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  monthScroll: {
    flexDirection: "row",
  },
  monthButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginRight: 10,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  monthText: {
    fontSize: 14,
    fontWeight: "600",
  },
  eventsContainer: {
    padding: 20,
  },
  eventCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#6b7280",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#1e40af",
  },
  eventHeader: {
    marginBottom: 12,
  },
  eventTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e40af",
    flex: 1,
    marginRight: 10,
  },
  eventBadges: {
    gap: 5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  badgeText: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "600",
  },
  eventDate: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "600",
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  eventDescription: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 15,
  },
  eventFooter: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventProgram: {
    fontSize: 13,
    color: "#7c3aed",
    fontWeight: "600",
  },
  eventAttendees: {
    fontSize: 13,
    color: "#6b7280",
  },
  noEventsContainer: {
    backgroundColor: "#f3f4f6",
    borderRadius: 15,
    padding: 40,
    alignItems: "center",
  },
  noEventsText: {
    fontSize: 18,
    color: "#6b7280",
    fontWeight: "600",
    marginBottom: 8,
  },
  noEventsSubtext: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
  },
  legendContainer: {
    padding: 20,
    backgroundColor: "#f0f9ff",
    margin: 15,
    borderRadius: 15,
  },
  legendGrid: {
    gap: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 10,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  legendContent: {
    flex: 1,
  },
  legendType: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 2,
  },
  legendDescription: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 16,
  },
  contactContainer: {
    padding: 20,
    margin: 15,
    marginBottom: 30,
    backgroundColor: "#f3e8ff",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#a855f7",
  },
  contactText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 15,
  },
  contactDetails: {
    gap: 8,
  },
  contactItem: {
    fontSize: 14,
    color: "#7c3aed",
    textAlign: "center",
    fontWeight: "500",
  },
});