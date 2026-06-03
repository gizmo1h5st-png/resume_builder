import React from 'react';
import { ResumeData, ResumeConfig } from '../../types';
import { getFontFamily, getSpacingPx, formatDate, hexToRgba } from '../../utils';
import { PROFICIENCY_LABELS } from '../../constants';

interface Props {
  data: ResumeData;
  config: ResumeConfig;
  sidebarLeft?: boolean;
}

/* ── helpers ────────────────────────────────────────────────── */

// Level labels kept only for internal reference, not shown in CV
const _LEVEL_LABELS = ['', 'Нач', 'Баз', 'Сред', 'Прод', 'Эксп'];
void _LEVEL_LABELS;

const SideLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{
    fontSize: 9, fontWeight: 800, textTransform: 'uppercase',
    letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)',
    margin: '0 0 8px',
  }}>
    {children}
  </p>
);

const Divider = () => (
  <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', margin: '14px 0' }} />
);

/* ── component ──────────────────────────────────────────────── */

export const ModernTemplate: React.FC<Props> = ({ data, config, sidebarLeft = true }) => {
  const { personal, summary, experience, education, skills, languages } = data;
  const cs = config.colorScheme;
  const sp = getSpacingPx(config.spacing);
  const ff = getFontFamily(config.font);

  /* ── SIDEBAR ── */
  const sidebar = (
    <div style={{
      width: 210,
      minWidth: 210,
      flexShrink: 0,
      background: `linear-gradient(160deg, ${cs.primary} 0%, ${hexToRgba(cs.primary, 0.88)} 100%)`,
      padding: `${sp * 1.5}px ${sp}px`,
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* bg decoration */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

      {/* photo */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: sp * 1.1 }}>
        {personal.photo ? (
          <img
            src={personal.photo}
            alt="photo"
            style={{
              width: 100, height: 100, borderRadius: '50%', objectFit: 'cover',
              border: '3px solid rgba(255,255,255,0.3)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          />
        ) : (
          <div style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            border: '2px dashed rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, color: 'rgba(255,255,255,0.4)',
          }}>👤</div>
        )}
      </div>

      {/* name */}
      <div style={{ textAlign: 'center', marginBottom: sp }}>
        <h1 style={{ color: '#fff', fontSize: 17, fontWeight: 900, margin: 0, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          {personal.fullName || 'Ваше Имя'}
        </h1>
        <div style={{
          display: 'inline-block', marginTop: 7,
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 99, padding: '3px 12px',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 10, margin: 0, letterSpacing: '0.07em', textTransform: 'uppercase', fontWeight: 600 }}>
            {personal.jobTitle || 'Должность'}
          </p>
        </div>
      </div>

      <Divider />

      {/* contacts */}
      <div style={{ marginBottom: 4 }}>
        <SideLabel>Контакты</SideLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {personal.email && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 1 }}>✉</span>
              <span style={{ color: 'rgba(255,255,255,0.88)', fontSize: 10.5, wordBreak: 'break-all', lineHeight: 1.4 }}>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>☎</span>
              <span style={{ color: 'rgba(255,255,255,0.88)', fontSize: 10.5 }}>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>⌖</span>
              <span style={{ color: 'rgba(255,255,255,0.88)', fontSize: 10.5 }}>{personal.location}</span>
            </div>
          )}
          {personal.links.map((l) => (
            <div key={l.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 2 }}>⬡</span>
              <span style={{ color: 'rgba(255,255,255,0.88)', fontSize: 10.5, wordBreak: 'break-all', lineHeight: 1.4 }}>{l.url || l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* skills */}
      {skills.length > 0 && (
        <>
          <Divider />
          <div>
            <SideLabel>Навыки</SideLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {skills.map((sk) => (
                <div key={sk.id}>
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ color: 'rgba(255,255,255,0.88)', fontSize: 10.5, fontWeight: 500 }}>{sk.name}</span>
                  </div>
                  {/* bar */}
                  <div style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.12)', position: 'relative' }}>
                    <div style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: `${(sk.level / 5) * 100}%`,
                      borderRadius: 99,
                      background: `linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.55))`,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* languages */}
      {languages.length > 0 && (
        <>
          <Divider />
          <div>
            <SideLabel>Языки</SideLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.88)', fontSize: 10.5, fontWeight: 600 }}>{lang.name}</span>
                  <span style={{
                    fontSize: 9, fontWeight: 700,
                    color: 'rgba(255,255,255,0.7)',
                    background: 'rgba(255,255,255,0.12)',
                    padding: '2px 7px', borderRadius: 99,
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}>
                    {PROFICIENCY_LABELS[lang.proficiency] || lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  /* ── MAIN CONTENT ── */
  const sectionTitle = (title: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: sp * 0.7 }}>
      <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.13em', color: cs.primary, margin: 0 }}>{title}</h2>
      <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg, ${cs.accent}, transparent)`, borderRadius: 1 }} />
    </div>
  );

  const main = (
    <div style={{ flex: 1, padding: `${sp * 1.4}px ${sp * 1.3}px`, display: 'flex', flexDirection: 'column', gap: sp * 1.1, minWidth: 0, background: cs.background }}>

      {/* summary */}
      {summary && (
        <div>
          {sectionTitle('О себе')}
          <p style={{ fontSize: 11.5, lineHeight: 1.75, margin: 0, color: hexToRgba(cs.text, 0.85) }}>{summary}</p>
        </div>
      )}

      {/* experience */}
      {experience.length > 0 && (
        <div>
          {sectionTitle('Опыт работы')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: sp * 0.95 }}>
            {experience.map((exp, idx) => (
              <div key={exp.id} style={{ display: 'flex', gap: 12 }}>
                {/* dot + line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4, width: 16, flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: cs.accent, flexShrink: 0 }} />
                  {idx < experience.length - 1 && (
                    <div style={{ width: 1.5, flex: 1, marginTop: 4, background: hexToRgba(cs.accent, 0.25), minHeight: 16 }} />
                  )}
                </div>
                <div style={{ flex: 1, paddingBottom: sp * 0.2 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4, marginBottom: 3 }}>
                    <div>
                      <span style={{ fontWeight: 800, fontSize: 13, color: cs.text }}>{exp.position}</span>
                      <span style={{ color: cs.accent, fontWeight: 700, fontSize: 12, marginLeft: 5 }}>· {exp.company}</span>
                    </div>
                    <span style={{
                      fontSize: 10, color: cs.primary, fontWeight: 700,
                      background: hexToRgba(cs.primary, 0.1),
                      padding: '2px 9px', borderRadius: 99, whiteSpace: 'nowrap',
                    }}>
                      {formatDate(exp.startDate)} — {exp.current ? 'по н.в.' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p style={{ margin: '3px 0 0', fontSize: 11, lineHeight: 1.65, color: hexToRgba(cs.text, 0.75) }}>{exp.description}</p>
                  )}
                  {exp.highlights.filter(Boolean).length > 0 && (
                    <div style={{ marginTop: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {exp.highlights.filter(Boolean).map((h, i) => (
                        <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                          <div style={{ width: 4, height: 4, borderRadius: '50%', background: cs.accent, marginTop: 5, flexShrink: 0 }} />
                          <span style={{ fontSize: 10.5, lineHeight: 1.55, color: hexToRgba(cs.text, 0.72) }}>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* education */}
      {education.length > 0 && (
        <div>
          {sectionTitle('Образование')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: sp * 0.6 }}>
            {education.map((edu) => (
              <div key={edu.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: `${sp * 0.5}px ${sp * 0.75}px`,
                background: hexToRgba(cs.accent, 0.06),
                borderRadius: 10, flexWrap: 'wrap', gap: 6,
                borderLeft: `3px solid ${cs.accent}`,
              }}>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 12.5, color: cs.text, margin: 0 }}>{edu.institution}</p>
                  <p style={{ fontSize: 11, color: hexToRgba(cs.text, 0.6), margin: '2px 0 0' }}>
                    {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                  </p>
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: cs.accent }}>
                  {edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{
      fontFamily: ff,
      width: '100%',
      minHeight: '100%',
      display: 'flex',
      flexDirection: sidebarLeft ? 'row' : 'row-reverse',
    }}>
      {sidebar}
      {main}
    </div>
  );
};
