import React from 'react';
import { ResumeData, ResumeConfig } from '../../types';
import { getFontFamily, getSpacingPx, formatDate, hexToRgba } from '../../utils';
import { PROFICIENCY_LABELS } from '../../constants';

interface Props {
  data: ResumeData;
  config: ResumeConfig;
}

/* ── helpers ────────────────────────────────────────────────── */

function lighten(hex: string, amount = 0.92): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

const SkillBar: React.FC<{ level: number; accent: string; bg: string }> = ({ level, accent, bg }) => (
  <div style={{ display: 'flex', gap: 3 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        style={{
          height: 5,
          flex: 1,
          borderRadius: 99,
          background: i <= level
            ? `linear-gradient(90deg, ${accent}, ${hexToRgba(accent, 0.7)})`
            : bg,
        }}
      />
    ))}
  </div>
);

interface SectionProps {
  title: string;
  primary: string;
  accent: string;
  spacing: number;
  children: React.ReactNode;
}
const Section: React.FC<SectionProps> = ({ title, primary, accent, spacing, children }) => (
  <div style={{ marginBottom: spacing * 1.1 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: spacing * 0.65 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: `linear-gradient(135deg, ${primary}, ${accent})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <div style={{ width: 10, height: 2, background: '#fff', borderRadius: 2 }} />
      </div>
      <h2 style={{
        fontSize: 11,
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.13em',
        color: primary,
        margin: 0,
      }}>
        {title}
      </h2>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${hexToRgba(accent, 0.4)}, transparent)` }} />
    </div>
    {children}
  </div>
);

/* ── main component ─────────────────────────────────────────── */

export const ClassicTemplate: React.FC<Props> = ({ data, config }) => {
  const { personal, summary, experience, education, skills, languages } = data;
  const cs = config.colorScheme;
  const sp = getSpacingPx(config.spacing);
  const ff = getFontFamily(config.font);
  const softBg = lighten(cs.primary, 0.94);

  return (
    <div style={{ fontFamily: ff, background: cs.background, color: cs.text, width: '100%', minHeight: '100%' }}>

      {/* ══ HEADER ══ */}
      <div style={{
        background: `linear-gradient(135deg, ${cs.primary} 0%, ${hexToRgba(cs.primary, 0.85)} 100%)`,
        padding: `${sp * 1.6}px ${sp * 1.8}px`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* decorative circles */}
        <div style={{ position: 'absolute', top: -30, right: 120, width: 140, height: 140, borderRadius: '50%', background: hexToRgba('#fff', 0.05) }} />
        <div style={{ position: 'absolute', bottom: -40, right: -20, width: 180, height: 180, borderRadius: '50%', background: hexToRgba('#fff', 0.04) }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: sp, position: 'relative' }}>
          <div style={{ flex: 1 }}>
            {/* name */}
            <h1 style={{ color: '#fff', fontSize: 30, fontWeight: 900, margin: 0, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              {personal.fullName || 'Ваше Имя'}
            </h1>
            {/* job title pill — no rgba bg so html2canvas renders correctly */}
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              marginTop: 8,
              borderRadius: 99, padding: '4px 14px',
              border: '1.5px solid rgba(255,255,255,0.6)',
              background: 'transparent',
            }}>
              <span style={{ color: '#ffffff', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em' }}>
                {personal.jobTitle || 'Должность'}
              </span>
            </div>

            {/* contacts */}
            <div style={{ marginTop: sp * 0.9, display: 'flex', flexWrap: 'wrap', gap: `${sp * 0.3}px ${sp * 1.1}px` }}>
              {personal.email && (
                <span style={{ color: hexToRgba('#fff', 0.88), fontSize: 11, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 12 }}>✉</span> {personal.email}
                </span>
              )}
              {personal.phone && (
                <span style={{ color: hexToRgba('#fff', 0.88), fontSize: 11, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 12 }}>☎</span> {personal.phone}
                </span>
              )}
              {personal.location && (
                <span style={{ color: hexToRgba('#fff', 0.88), fontSize: 11, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 12 }}>⌖</span> {personal.location}
                </span>
              )}
              {personal.links.map((l) => (
                <span key={l.id} style={{ color: hexToRgba('#fff', 0.88), fontSize: 11, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 10 }}>⬡</span> {l.url || l.label}
                </span>
              ))}
            </div>
          </div>

          {/* photo */}
          {personal.photo ? (
            <img
              src={personal.photo}
              alt="photo"
              style={{
                width: 96, height: 96, borderRadius: 16, objectFit: 'cover', flexShrink: 0,
                border: `3px solid ${hexToRgba('#fff', 0.35)}`,
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              }}
            />
          ) : null}
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div style={{ padding: `${sp * 1.3}px ${sp * 1.8}px` }}>

        {/* summary */}
        {summary && (
          <Section title="О себе" primary={cs.primary} accent={cs.accent} spacing={sp}>
            <div style={{
              background: softBg,
              borderLeft: `3px solid ${cs.accent}`,
              borderRadius: '0 10px 10px 0',
              padding: `${sp * 0.6}px ${sp * 0.9}px`,
            }}>
              <p style={{ fontSize: 12, lineHeight: 1.75, margin: 0, color: cs.text }}>{summary}</p>
            </div>
          </Section>
        )}

        {/* experience */}
        {experience.length > 0 && (
          <Section title="Опыт работы" primary={cs.primary} accent={cs.accent} spacing={sp}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: sp * 0.9 }}>
              {experience.map((exp, idx) => (
                <div key={exp.id} style={{ display: 'flex', gap: 12 }}>
                  {/* timeline */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20, flexShrink: 0, paddingTop: 3 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: cs.accent, border: `2px solid ${cs.primary}`, flexShrink: 0 }} />
                    {idx < experience.length - 1 && (
                      <div style={{ width: 2, flex: 1, marginTop: 4, background: `linear-gradient(${hexToRgba(cs.accent, 0.4)}, transparent)`, minHeight: 20 }} />
                    )}
                  </div>

                  <div style={{ flex: 1, paddingBottom: sp * 0.3 }}>
                    {/* header row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4, marginBottom: 3 }}>
                      <div>
                        <span style={{ fontWeight: 800, fontSize: 13.5, color: cs.text }}>{exp.position}</span>
                        <span style={{ color: cs.accent, fontWeight: 700, fontSize: 12.5, marginLeft: 6 }}>@ {exp.company}</span>
                      </div>
                      <span style={{
                        fontSize: 10.5,
                        background: hexToRgba(cs.primary, 0.1),
                        padding: '2px 9px', borderRadius: 99,
                        fontWeight: 700, whiteSpace: 'nowrap',
                        border: `1px solid ${hexToRgba(cs.primary, 0.18)}`,
                        color: cs.primary,
                      }}>
                        {formatDate(exp.startDate)} — {exp.current ? 'по н.в.' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p style={{ margin: '4px 0 0', fontSize: 11.5, lineHeight: 1.65, color: hexToRgba(cs.text, 0.8) }}>{exp.description}</p>
                    )}
                    {exp.highlights.filter(Boolean).length > 0 && (
                      <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {exp.highlights.filter(Boolean).map((h, i) => (
                          <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: cs.accent, marginTop: 5, flexShrink: 0 }} />
                            <span style={{ fontSize: 11, lineHeight: 1.55, color: hexToRgba(cs.text, 0.78) }}>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* education */}
        {education.length > 0 && (
          <Section title="Образование" primary={cs.primary} accent={cs.accent} spacing={sp}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: sp * 0.7 }}>
              {education.map((edu) => (
                <div key={edu.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: `${sp * 0.55}px ${sp * 0.8}px`,
                  background: softBg, borderRadius: 10,
                  flexWrap: 'wrap', gap: 6,
                }}>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: 13, color: cs.text, margin: 0 }}>{edu.institution}</p>
                    <p style={{ fontSize: 11.5, color: hexToRgba(cs.text, 0.65), margin: '2px 0 0' }}>
                      {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                    </p>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: cs.accent,
                    background: hexToRgba(cs.accent, 0.1),
                    padding: '3px 10px', borderRadius: 99,
                  }}>
                    {edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* skills + languages */}
        <div style={{ display: 'flex', gap: sp * 1.8, flexWrap: 'wrap' }}>
          {skills.length > 0 && (
            <div style={{ flex: '1 1 200px' }}>
              <Section title="Навыки" primary={cs.primary} accent={cs.accent} spacing={sp}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {skills.map((sk) => (
                    <div key={sk.id}>
                      <div style={{ marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: cs.text }}>{sk.name}</span>
                      </div>
                      <SkillBar level={sk.level} accent={cs.accent} bg={hexToRgba(cs.accent, 0.12)} />
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ flex: '1 1 160px' }}>
              <Section title="Языки" primary={cs.primary} accent={cs.accent} spacing={sp}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {languages.map((lang) => (
                    <div key={lang.id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '6px 10px', background: softBg, borderRadius: 8,
                    }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: cs.text }}>{lang.name}</span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, color: cs.primary,
                        background: hexToRgba(cs.accent, 0.15),
                        padding: '2px 9px', borderRadius: 99,
                      }}>
                        {PROFICIENCY_LABELS[lang.proficiency] || lang.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
