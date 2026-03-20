import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, Platform, useWindowDimensions, StyleSheet } from 'react-native';
import { theme } from '../components/theme';

export default function LandingPage() {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isDesktop = width >= 768;

  const handleJoin = () => {
    if (email.trim() && email.includes('@')) {
      console.log('Submitted email:', email);
      setSubmitted(true);
    }
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* Navbar */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: isDesktop ? 64 : 24,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        backgroundColor: theme.colors.background
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ width: 24, height: 24, backgroundColor: theme.colors.primary, borderRadius: 6 }} />
          <Text selectable style={{ fontSize: 20, fontWeight: '700', color: theme.colors.text, fontFamily: theme.typography.fontFamily }}>
            BioFlow
          </Text>
        </View>
        <Pressable 
          onPress={() => {}}
          style={({ hovered }) => ({
            backgroundColor: hovered ? theme.colors.primaryHover : theme.colors.primary,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            borderCurve: 'continuous',
            ...Platform.select({ web: { cursor: 'pointer', transition: '0.2s' }, default: {} })
          } as any)}
        >
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14, fontFamily: theme.typography.fontFamily }}>
            Run Pipeline
          </Text>
        </Pressable>
      </View>

      {/* Hero Section */}
      <View style={{
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: isDesktop ? 80 : 40,
        paddingBottom: 80,
      }}>
        <View style={{ maxWidth: 800, alignItems: 'center', gap: 24 }}>
          <Text selectable style={{
            fontSize: isDesktop ? 56 : 40,
            fontWeight: '800',
            color: theme.colors.text,
            textAlign: 'center',
            lineHeight: isDesktop ? 64 : 48,
            fontFamily: theme.typography.fontFamily,
          }}>
            The Ultimate Bioinformatics Canvas
          </Text>
          <Text selectable style={{
            fontSize: isDesktop ? 20 : 18,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            lineHeight: 28,
            maxWidth: 600,
            fontFamily: theme.typography.fontFamily,
          }}>
            Build, analyze, and interpret RNA-seq pipelines with AI. Drag and drop nodes to create complex bioinformatics workflows in seconds.
          </Text>

          {/* Email Form */}
          <View style={{
            flexDirection: isDesktop ? 'row' : 'column',
            gap: 12,
            width: '100%',
            maxWidth: 480,
            marginTop: 16,
          }}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email address"
              placeholderTextColor={theme.colors.textSecondary}
              style={{
                flex: 1,
                height: 48,
                backgroundColor: theme.colors.backgroundSecondary,
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: 12,
                borderCurve: 'continuous',
                paddingHorizontal: 16,
                fontSize: 16,
                color: theme.colors.text,
                fontFamily: theme.typography.fontFamily,
                ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {})
              } as any}
            />
            <Pressable
              onPress={handleJoin}
              style={({ hovered, pressed }) => ({
                height: 48,
                backgroundColor: submitted ? theme.colors.success : (hovered ? theme.colors.primaryHover : theme.colors.primary),
                paddingHorizontal: 24,
                borderRadius: 12,
                borderCurve: 'continuous',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: pressed ? 0.9 : 1,
                ...Platform.select({
                  web: { 
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: theme.shadows.button
                  },
                  default: {}
                })
              } as any)}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: '600',
                fontFamily: theme.typography.fontFamily,
              }}>
                {submitted ? 'Joined!' : 'Join Waitlist'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Node Editor Abstract Visual (mocking what was in the image) */}
        <View style={{
          marginTop: 64,
          width: '100%',
          maxWidth: 1000,
          height: isDesktop ? 500 : 300,
          backgroundColor: theme.colors.backgroundSecondary,
          borderRadius: 24,
          borderCurve: 'continuous',
          borderWidth: 1,
          borderColor: theme.colors.border,
          overflow: 'hidden',
          ...Platform.select({
            web: { boxShadow: theme.shadows.card },
            default: {}
          })
        }}>
          {/* Abstract Nodes */}
          <View style={{ flex: 1, padding: 24 }}>
            <NodeBadge x="10%" y="20%" icon="Upload" title="File Input" subtitle="Upload FASTQ, FASTA..." dotColor={theme.colors.success} />
            <NodeBadge x="40%" y="40%" icon="Align" title="STAR Alignment" subtitle="Aligns RNA-seq reads" dotColor={theme.colors.success} />
            <NodeBadge x="70%" y="60%" icon="BarChart" title="DESeq2" subtitle="Differential gene expr..." dotColor={theme.colors.primary} />
            <NodeBadge x="30%" y="80%" icon="Layout" title="AI Interpret" subtitle="Get plain-language..." dotColor={theme.colors.textSecondary} />
            
            {/* Connecting Lines (CSS absolute borders to fake it) */}
            <View style={{ position: 'absolute', top: '30%', left: '25%', width: '15%', height: '15%', borderBottomWidth: 2, borderLeftWidth: 2, borderColor: theme.colors.border, borderBottomLeftRadius: 16 }} />
            <View style={{ position: 'absolute', top: '50%', left: '55%', width: '15%', height: '15%', borderBottomWidth: 2, borderLeftWidth: 2, borderColor: theme.colors.border, borderBottomLeftRadius: 16 }} />
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

// Sub-component for mocking the BioFlow Nodes
function NodeBadge({ x, y, icon, title, subtitle, dotColor }: any) {
  return (
    <View style={{
      position: 'absolute',
      left: x,
      top: y,
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 12,
      borderCurve: 'continuous',
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 16,
      minWidth: 200,
      ...Platform.select({
        web: { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' },
        default: {}
      })
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: theme.colors.text }}>{title}</Text>
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: dotColor }} />
      </View>
      <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>{subtitle}</Text>
    </View>
  );
}
