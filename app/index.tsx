import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, Platform, useWindowDimensions, StyleSheet } from 'react-native';
import { theme } from '../components/theme';
import { Feather } from '@expo/vector-icons';

export default function LandingPage() {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isDesktop = width >= 768;

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxlwITT8HVAbPBs5yreLTXTqin4VrRn-fbye9hc7rVEe_9vwa230-GF-0yzeH17cIsa/exec'; // <-- Replace with Web App URL

  const handleJoin = async () => {
    if (email.trim() && email.includes('@')) {
      setIsLoading(true);
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: {
            // Using text/plain to bypass CORS preflight for simple request
            'Content-Type': 'text/plain;charset=utf-8', 
          },
          body: JSON.stringify({ email }),
        });
        
        const result = await response.json();
        if (result.result === 'success') {
          setSubmitted(true);
          setEmail('');
        } else {
          alert('Failed to submit email. Please try again later.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to connect to the server.');
      } finally {
        setIsLoading(false);
      }
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
            Get Started Free
          </Text>
        </Pressable>
      </View>

      {/* Hero Section */}
      <View style={{
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: isDesktop ? 80 : 40,
        paddingBottom: 40,
      }}>
        <View style={{ maxWidth: 900, alignItems: 'center', gap: 24 }}>
          <Text selectable style={{
            fontSize: isDesktop ? 56 : 40,
            fontWeight: '800',
            color: theme.colors.text,
            textAlign: 'center',
            lineHeight: isDesktop ? 64 : 48,
            fontFamily: theme.typography.fontFamily,
            letterSpacing: -1,
          }}>
            Tired of CLI tools you can’t read and pipelines you can’t reproduce?
          </Text>
          <Text selectable style={{
            fontSize: isDesktop ? 22 : 18,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            lineHeight: 32,
            maxWidth: 750,
            fontFamily: theme.typography.fontFamily,
          }}>
            BioFlow — the open-source, low-code node canvas that makes bioinformatics accessible to everyone. Free forever. Community-powered.
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
                height: 54,
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
                height: 54,
                backgroundColor: submitted ? theme.colors.success : (hovered ? theme.colors.primaryHover : theme.colors.primary),
                paddingHorizontal: 32,
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
                fontSize: 18,
                fontWeight: '600',
                fontFamily: theme.typography.fontFamily,
              }}>
                {submitted ? 'Joined!' : (isLoading ? 'Joining...' : 'Get Started Free')}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Node Editor Abstract Visual */}
        <View style={{
          marginTop: 64,
          width: '100%',
          maxWidth: 1000,
          height: isDesktop ? 500 : 360,
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
            <NodeBadge x={isDesktop ? "10%" : "5%"} y="10%" title="File Input" subtitle="Upload FASTQ, FASTA..." dotColor={theme.colors.success} icon="file-text" />
            <NodeBadge x={isDesktop ? "40%" : "30%"} y="35%" title="STAR Alignment" subtitle="Aligns RNA-seq reads" dotColor={theme.colors.success} icon="git-merge" />
            <NodeBadge x={isDesktop ? "70%" : "55%"} y="60%" title="DESeq2" subtitle="Differential gene expr..." dotColor={theme.colors.primary} icon="bar-chart-2" />
            <NodeBadge x={isDesktop ? "30%" : "10%"} y="80%" title="AI Interpret" subtitle="Get plain-language summary" dotColor={theme.colors.textSecondary} icon="cpu" />
            
            {/* Connecting Lines */}
            <View style={{ position: 'absolute', top: '20%', left: isDesktop ? '25%' : '15%', width: '15%', height: '15%', borderBottomWidth: 2, borderLeftWidth: 2, borderColor: theme.colors.border, borderBottomLeftRadius: 16 }} />
            <View style={{ position: 'absolute', top: '45%', left: isDesktop ? '55%' : '40%', width: '15%', height: '15%', borderBottomWidth: 2, borderLeftWidth: 2, borderColor: theme.colors.border, borderBottomLeftRadius: 16 }} />
          </View>
        </View>

      </View>

      {/* Problem Section */}
      <View style={{ backgroundColor: theme.colors.backgroundSecondary, paddingVertical: 80, paddingHorizontal: 24, alignItems: 'center' }}>
        <View style={{ maxWidth: 1000, width: '100%' }}>
          <Text selectable style={{ fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: theme.colors.text, textAlign: 'center', marginBottom: 16, fontFamily: theme.typography.fontFamily, letterSpacing: -0.5 }}>
            The bioinformatics bottleneck
          </Text>
          <Text selectable style={{ fontSize: 18, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 48, maxWidth: 700, alignSelf: 'center', fontFamily: theme.typography.fontFamily, lineHeight: 28 }}>
            You’re a researcher drowning in complex command-line tools. The entry barrier is brutal—you either waste months learning cryptic scripts or stay completely dependent on the one coder in the lab.
          </Text>
          
          <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 24 }}>
            <ProblemCard 
              icon="terminal" 
              title="Complex CLI tools" 
              description="Weeks fighting installation errors and version conflicts instead of doing science." 
            />
            <ProblemCard 
              icon="box" 
              title="Black-box code" 
              description="Your pipeline is a black box — only one person in the lab can touch it or understand it." 
            />
            <ProblemCard 
              icon="alert-triangle" 
              title="Reproducibility hell" 
              description="The same analysis that worked last month now fails and nobody knows why... and your paper gets rejected." 
            />
          </View>
        </View>
      </View>

      {/* Product & Solution Section */}
      <View style={{ paddingVertical: 80, paddingHorizontal: 24, alignItems: 'center' }}>
        <View style={{ maxWidth: 1000, width: '100%' }}>
          <Text selectable style={{ fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: theme.colors.text, textAlign: 'center', marginBottom: 16, fontFamily: theme.typography.fontFamily, letterSpacing: -0.5 }}>
             The open-source, modular, low-code answer
          </Text>
          <Text selectable style={{ fontSize: 18, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 48, maxWidth: 800, alignSelf: 'center', fontFamily: theme.typography.fontFamily, lineHeight: 28 }}>
             BioFlow lets you (and your entire team) build powerful, transparent, and fully reproducible pipelines by simply dragging and connecting nodes on a beautiful canvas — no coding required.
          </Text>

          <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 32, alignItems: isDesktop ? 'flex-start' : 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <FeatureItem icon="move" title="Zero entry barrier" description="Drag-and-drop nodes to build complex workflows instantly." />
            <FeatureItem icon="github" title="100% open-source" description="Community modules and absolute control. Zero vendor lock-in." />
            <FeatureItem icon="cloud" title="Scale instantly" description="Built-in reproducibility. Runs anywhere, scales instantly with BioFlow Cloud." />
          </View>
        </View>
      </View>

      {/* Differentiation & FAQ */}
      <View style={{ backgroundColor: theme.colors.backgroundSecondary, paddingVertical: 80, paddingHorizontal: 24, alignItems: 'center' }}>
        <View style={{ maxWidth: 800, width: '100%' }}>
          <Text selectable style={{ fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: theme.colors.text, textAlign: 'center', marginBottom: 48, fontFamily: theme.typography.fontFamily, letterSpacing: -0.5 }}>
            Why choose BioFlow?
          </Text>
          
          <View style={{ backgroundColor: theme.colors.cardBackground, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden' }}>
            <ComparisonRow competitor="Nextflow / Snakemake" weakness="Code-only, steep learning curve" advantage="Low-code visual canvas + export to clean code if needed" isFirst />
            <ComparisonRow competitor="Galaxy" weakness="Clunky UI, not community-driven" advantage="Modern UI + anyone can build & share modules" />
            <ComparisonRow competitor="KNIME" weakness="General-purpose, heavy desktop app" advantage="Bioinformatics-first + free SaaS Cloud option" />
            <ComparisonRow competitor="Commercial platforms" weakness="Expensive, aggressive vendor lock-in" advantage="100% open-source core + free-to-start Cloud" />
          </View>

          <View style={{ marginTop: 48, gap: 24 }}>
            <FaqItem 
              question="We already use scripts / Nextflow." 
              answer="Great. Build visually in BioFlow, and instantly export as clean, reproducible Nextflow code. Your coders keep control, everyone else gets superpowers." 
            />
            <FaqItem 
              question="Is it really free?" 
              answer="Yes — core is fully open-source forever. BioFlow Cloud is free to start and scales with your team's usage." 
            />
          </View>
        </View>
      </View>

      {/* Bottom CTA */}
      <View style={{ paddingVertical: 100, paddingHorizontal: 24, alignItems: 'center' }}>
        <Text selectable style={{ fontSize: isDesktop ? 40 : 32, fontWeight: '800', color: theme.colors.text, textAlign: 'center', marginBottom: 24, fontFamily: theme.typography.fontFamily, letterSpacing: -1 }}>
          Stop fighting CLI tools.
        </Text>
        <Text selectable style={{ fontSize: 18, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 40, fontFamily: theme.typography.fontFamily, maxWidth: 600 }}>
          Join the waitlist to get early access and start building pipelines in hours, not weeks.
        </Text>
         <View style={{
            flexDirection: isDesktop ? 'row' : 'column',
            gap: 12,
            width: '100%',
            maxWidth: 480,
          }}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email address"
              placeholderTextColor={theme.colors.textSecondary}
              style={{
                flex: 1,
                height: 54,
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
                height: 54,
                backgroundColor: submitted ? theme.colors.success : (hovered ? theme.colors.primaryHover : theme.colors.primary),
                paddingHorizontal: 32,
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
                fontSize: 18,
                fontWeight: '600',
                fontFamily: theme.typography.fontFamily,
              }}>
                {submitted ? 'Joined!' : (isLoading ? 'Joining...' : 'Get Started Free')}
              </Text>
            </Pressable>
          </View>
      </View>

    </ScrollView>
  );
}

// Sub-components
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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Feather name={icon as any} size={14} color={theme.colors.textSecondary} />
          <Text style={{ fontSize: 14, fontWeight: '600', color: theme.colors.text }}>{title}</Text>
        </View>
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: dotColor }} />
      </View>
      <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>{subtitle}</Text>
    </View>
  );
}

function ProblemCard({ icon, title, description }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.cardBackground, padding: 32, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, borderCurve: 'continuous', ...Platform.select({ web: { boxShadow: theme.shadows.card }, default: {}}) }}>
      <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: theme.colors.backgroundSecondary, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
        <Feather name={icon as any} size={24} color={theme.colors.primary} />
      </View>
      <Text style={{ fontSize: 20, fontWeight: '600', color: theme.colors.text, marginBottom: 12, fontFamily: theme.typography.fontFamily }}>{title}</Text>
      <Text style={{ fontSize: 16, color: theme.colors.textSecondary, lineHeight: 24, fontFamily: theme.typography.fontFamily }}>{description}</Text>
    </View>
  );
}

function FeatureItem({ icon, title, description }: any) {
  return (
    <View style={{ width: 280, alignItems: 'center' }}>
      <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: theme.colors.backgroundSecondary, justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: theme.colors.border }}>
        <Feather name={icon as any} size={32} color={theme.colors.primary} />
      </View>
      <Text style={{ fontSize: 20, fontWeight: '600', color: theme.colors.text, marginBottom: 12, fontFamily: theme.typography.fontFamily, textAlign: 'center' }}>{title}</Text>
      <Text style={{ fontSize: 16, color: theme.colors.textSecondary, lineHeight: 24, fontFamily: theme.typography.fontFamily, textAlign: 'center' }}>{description}</Text>
    </View>
  );
}

function ComparisonRow({ competitor, weakness, advantage, isFirst }: any) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: isFirst ? 0 : 1, borderTopColor: theme.colors.border }}>
      <View style={{ width: '100%', maxWidth: 200, padding: 20, backgroundColor: theme.colors.backgroundSecondary }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.text, fontFamily: theme.typography.fontFamily }}>{competitor}</Text>
      </View>
      <View style={{ flex: 1, minWidth: 200, padding: 20, borderLeftWidth: 1, borderLeftColor: theme.colors.border }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
          <Feather name="x-circle" size={18} color={theme.colors.textSecondary} style={{ marginTop: 2 }} />
          <Text style={{ fontSize: 14, color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily, flex: 1, lineHeight: 20 }}>{weakness}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
          <Feather name="check-circle" size={18} color={theme.colors.success} style={{ marginTop: 2 }} />
          <Text style={{ fontSize: 15, fontWeight: '500', color: theme.colors.text, fontFamily: theme.typography.fontFamily, flex: 1, lineHeight: 20 }}>{advantage}</Text>
        </View>
      </View>
    </View>
  );
}

function FaqItem({ question, answer }: any) {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.text, marginBottom: 8, fontFamily: theme.typography.fontFamily }}>
        {question}
      </Text>
      <Text style={{ fontSize: 16, color: theme.colors.textSecondary, lineHeight: 24, fontFamily: theme.typography.fontFamily }}>
        {answer}
      </Text>
    </View>
  );
}
