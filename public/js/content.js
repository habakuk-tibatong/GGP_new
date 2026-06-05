// ═══════════════════════════════════════════════════════════════════
// CONTENT.JS – Alle Lehrtexte, Quizfragen, Glossar
// Freiheit & Determination – Ethik 12. Jahrgangsstufe Bayern
// ═══════════════════════════════════════════════════════════════════

const CHAPTERS = [
  {
    id: 'libet',
    emoji: '🧪',
    num: 'Kapitel 1',
    title: 'Das Libet-Experiment',
    desc: 'Empirische Grundlagen: Bereitschaftspotenzial, zeitliche Asymmetrie und die Chronometrie des Willens.',
    color: '#38bdf8',
    xpReward: 50,
    content: `
      <h3>1. Die Chronometrie des Willens</h3>
      <p>Die Debatte um die menschliche Willensfreiheit wurde durch eine Serie von Laborexperimenten neu entfacht. Im Mittelpunkt steht die Frage: <strong>Wann entscheidet das Gehirn – und wann entscheidet das bewusste Ich?</strong></p>
      <p>Der Neurophysiologe Benjamin Libet stellte 1983 Versuche an, die die Wissenschaftswelt erschütterten. Er bat Probanden, spontan eine Handbewegung auszuführen, dabei auf eine rotierende Uhr zu schauen und den Zeitpunkt ihres bewussten „Willensdrangs" (W-Zeitpunkt) zu notieren. Gleichzeitig wurde mittels EEG die Hirnaktivität gemessen.</p>
      
      <div class="quote">„Das Bereitschaftspotenzial beginnt bereits etwa 550 ms vor der Bewegung – das Bewusstsein der Absicht tritt erst ca. 200 ms vor der Handlung auf." — Benjamin Libet, 1983</div>
      
      <h3>2. Die experimentellen Befunde im Überblick</h3>
      <table class="experiment-table">
        <thead><tr><th>Experiment</th><th>Methode</th><th>Zentraler Befund</th></tr></thead>
        <tbody>
          <tr><td><strong>Libet (1983)</strong></td><td>EEG, rotierende Uhr</td><td>Bereitschaftspotenzial ~550 ms vor Handlung; Bewusstsein der Absicht erst ~200 ms vorher</td></tr>
          <tr><td><strong>Haggard & Eimer (1999)</strong></td><td>EEG, lateralisiert</td><td>Bestätigung des zeitlichen Primats neuronaler Aktivität auch bei Wahl zwischen zwei Alternativen</td></tr>
          <tr><td><strong>Haynes et al. (ab 2008)</strong></td><td>fMRT, präfrontaler Kortex</td><td>Vorhersage von Entscheidungen bis zu 7–10 Sekunden vor dem bewussten Entschluss möglich</td></tr>
          <tr><td><strong>Schultze-Kraft & Haynes (2016)</strong></td><td>Brain-Computer-Interface</td><td>Bewusste Veto-Option: Probanden konnten eingeleitete Bewegungen bis 200 ms vor Ausführung stoppen</td></tr>
        </tbody>
      </table>
      
      <h3>3. Das Bereitschaftspotenzial – Was genau wird gemessen?</h3>
      <p>Das <strong>Bereitschaftspotenzial (BP)</strong> ist eine im EEG messbare, langsam ansteigende negative Spannungsverschiebung im Gehirn. Sie beginnt im supplementär-motorischen Kortex und breitet sich auf andere Areale aus, bevor eine willkürliche Bewegung erfolgt.</p>
      <p>Libets Schlussfolgerung war provokativ: Das Gehirn „entscheidet" bereits, bevor das Subjekt sich seiner Absicht bewusst wird. Das bewusste Erleben des Willens wäre damit eine Art <em>Nachkonstruktion</em> – eine <strong>Konfabulation</strong>.</p>
      
      <div class="quote">„Wir tun nicht, was wir wollen, sondern wir wollen, was wir tun." — Wolfgang Prinz</div>
      
      <h3>4. Die Veto-Funktion – ein wichtiger Einwand</h3>
      <p>Libet selbst wies darauf hin, dass Probanden die Handlung auch noch <em>nach</em> dem Auftreten des Bereitschaftspotenzials <strong>abbrechen</strong> konnten. Diese „Free Won't" (Freiheit des Nein-Sagens) wurde 2016 durch Schultze-Kraft und Haynes experimentell bestätigt: Über ein Brain-Computer-Interface konnten bereits eingeleitete Bewegungen bis zu <strong>200 ms vor dem „Point of no Return"</strong> gestoppt werden.</p>
      <p>Dies zeigt: Das Bewusstsein hat zumindest eine <em>Kontrollfunktion</em>, auch wenn es die Initiierung der Handlung nicht steuert.</p>
    `,
    activity: {
      type: 'timeline',
      title: '🕒 Aktivität: Die Zeitleiste des Libet-Experiments',
      desc: 'Ordne die folgenden Ereignisse in die richtige zeitliche Reihenfolge. Ziehe die Ereignisse in die passenden Zeitslots.',
      items: [
        { id: 'bp', label: '⚡ Bereitschaftspotenzial beginnt', time: '–550 ms' },
        { id: 'w', label: '💭 Bewusster Willensdrang (W-Zeitpunkt)', time: '–200 ms' },
        { id: 'emg', label: '💪 Muskelaktivierung (EMG)', time: '0 ms' },
        { id: 'move', label: '🤚 Sichtbare Bewegung', time: '+50 ms' },
      ],
      hint: 'Die Zeitangaben beziehen sich auf den Zeitpunkt der sichtbaren Bewegung (= 0 ms).'
    }
  },

  {
    id: 'neuro',
    emoji: '🧠',
    num: 'Kapitel 2',
    title: 'Neurobiologische Positionen',
    desc: 'Roth, Singer und Prinz: Determinismus, Illusion der Urheberschaft und das Gehirn als geschlossenes System.',
    color: '#a78bfa',
    xpReward: 50,
    content: `
      <h3>1. Die radikale neurobiologische These</h3>
      <p>Auf der Grundlage der Libet-Experimente und der modernen Hirnforschung haben namhafte Wissenschaftler eine weitreichende These formuliert: <strong>Willensfreiheit ist eine Illusion.</strong> Das Gehirn ist ein kausal geschlossenes System – ein immaterielles „Ich", das eigenständig und kausal in das Geschehen eingreifen könnte, existiert nicht.</p>
      
      <h3>2. Gerhard Roth: Das limbische System entscheidet</h3>
      <p>Gerhard Roth (Neurobiologie, Uni Bremen) argumentiert, dass die <strong>Letztentscheidung</strong> für Handlungen im limbischen System fällt – insbesondere in den Basalganglien und der Amygdala. Diese Strukturen funktionieren als „Handlungsgedächtnis" und treffen Entscheidungen, die dem Bewusstsein <em>unzugänglich</em> sind.</p>
      <div class="quote">„Das bewusste Ich ist lediglich ein Exekutivorgan, das nachträglich eine ‚Illusion der Urheberschaft' erzeugt. Es rationalisiert, was das Gehirn bereits beschlossen hat." — Gerhard Roth</div>
      <p>Nach Roth ist das, was wir als „Willensfreiheit" erleben, eine Art <strong>Konfabulation</strong> – eine psychologische Schutzfiktion des Bewusstseins. Praktische Konsequenz: Niemand ist wirklich für seine Taten verantwortlich, weil niemand für seine Gehirnstruktur verantwortlich ist.</p>
      
      <h3>3. Wolf Singer: Kausale Geschlossenheit und gesellschaftliches Konstrukt</h3>
      <p>Wolf Singer (Max-Planck-Institut Frankfurt) postuliert die <strong>vollständige Verschaltung des Gehirns nach Naturgesetzen</strong>. Ein immaterielles geistiges Agens, das kausal in neuronale Prozesse eingreifen könnte, widerspräche dem physikalischen Weltbild.</p>
      <p>Singer unterscheidet dabei zwei Perspektiven:</p>
      <ul style="margin: 0.75rem 0 0.75rem 1.5rem; color: var(--text-secondary);">
        <li><strong>Erste-Person-Perspektive (subjektiv):</strong> Das Freiheitserlebnis ist real – wir erleben uns als Urheber unserer Handlungen.</li>
        <li><strong>Dritte-Person-Perspektive (objektiv/wissenschaftlich):</strong> Diese subjektive Erfahrung lässt sich in der wissenschaftlichen Analyse nicht bestätigen.</li>
      </ul>
      <p>Freiheit ist für Singer ein <strong>soziokulturelles Konstrukt</strong>, das im gesellschaftlichen Dialog erlernt wird. Es ist gesellschaftlich nützlich, aber kein metaphysisches Faktum.</p>
      
      <h3>4. Wolfgang Prinz: Willensfreiheit als soziale Institution</h3>
      <p>Wolfgang Prinz (MPI für Kognitions- und Neurowissenschaften) hält Willensfreiheit für eine <strong>soziale Institution</strong>: Sie dient der kollektiven Regulierung des Handelns in einer Gemeinschaft – hat aber keine wissenschaftliche Basis in der Psychologie oder Neurobiologie.</p>
      <div class="quote">„Nicht wir kontrollieren unsere Handlungen, sondern unsere Handlungen kontrollieren uns." — Wolfgang Prinz</div>
      <p>Alle drei Wissenschaftler fordern Konsequenzen für das <strong>Schuldstrafrecht</strong>: Wenn niemand wirklich frei entscheidet, sollte das Vergeltungsprinzip durch präventive und therapeutische Maßnahmen ersetzt werden.</p>
    `,
    activity: {
      type: 'matching',
      title: '🎯 Aktivität: Wer hat das gesagt?',
      desc: 'Ordne die folgenden Aussagen dem richtigen Wissenschaftler zu.',
      items: [
        { text: 'Die Letztentscheidung fällt in den Basalganglien, dem Bewusstsein unzugänglich.', answer: 'Roth' },
        { text: 'Das Freiheitserlebnis ist aus der Dritte-Person-Perspektive nicht bestätigbar.', answer: 'Singer' },
        { text: 'Willensfreiheit ist eine soziale Institution, kein wissenschaftliches Konstrukt.', answer: 'Prinz' },
        { text: 'Das Ich ist ein Exekutivorgan, das Urheberschaft nachträglich konstruiert.', answer: 'Roth' },
        { text: 'Das Gehirn ist vollständig nach Naturgesetzen verschaltet – kein immaterielles Agens möglich.', answer: 'Singer' },
        { text: 'Unsere Handlungen kontrollieren uns – nicht umgekehrt.', answer: 'Prinz' },
      ],
      options: ['Roth', 'Singer', 'Prinz']
    }
  },

  {
    id: 'gruende',
    emoji: '⚙️',
    num: 'Kapitel 3',
    title: 'Philosophische Kritik I: Gründe statt Ursachen',
    desc: 'Kategorienfehler, Erste- vs. Dritte-Person-Perspektive, Handlungs- vs. Willensfreiheit und der performative Selbstwiderspruch.',
    color: '#f59e0b',
    xpReward: 50,
    content: `
      <h3>1. Die philosophische Gegenposition: Ein Kategorienfehler</h3>
      <p>Die schärfste philosophische Kritik am neurobiologischen Determinismus lautet: Die Neurowissenschaftler begehen einen fundamentalen <strong>Kategorienfehler</strong>. Sie verwechseln zwei logisch verschiedene Ebenen der Beschreibung:</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
        <div class="card-glass">
          <div style="font-weight:700; color: var(--sky); margin-bottom: 0.5rem;">⚡ Ursachen (Dritte-Person-Perspektive)</div>
          <p style="font-size:0.875rem;">Beschreiben materielle, physiko-chemische Prozesse, die lückenlosen Naturgesetzen folgen. Z.B.: „Synaptisches Potenzial löst Neurotransmitter-Ausschüttung aus."</p>
        </div>
        <div class="card-glass">
          <div style="font-weight:700; color: var(--gold-light); margin-bottom: 0.5rem;">💬 Gründe (Erste-Person-Perspektive)</div>
          <p style="font-size:0.875rem;">Bezeichnen rationale Sinnzusammenhänge, die ein Subjekt überzeugen. Z.B.: „Ich halte es für richtig, weil…" Gründe zwingen nicht physisch, sondern durch logische Kohärenz.</p>
        </div>
      </div>
      
      <p>Wenn ein Gehirn aktiviert wird, <em>handelt</em> nicht das Gehirn – dies kann nur der ganzen <strong>Person</strong> zugeschrieben werden. Das Gehirn <em>denkt</em> nicht, <em>glaubt</em> nicht, <em>entscheidet</em> nicht – diese Begriffe gehören zur Sprache von Personen, nicht von Organen.</p>
      
      <h3>2. Handlungsfreiheit vs. Willensfreiheit</h3>
      <p>Philosophen unterscheiden zwei Arten von Freiheit, die häufig vermengt werden:</p>
      <ul style="margin: 0.75rem 0 0.75rem 1.5rem; color: var(--text-secondary); line-height: 2;">
        <li><strong>Handlungsfreiheit:</strong> Abwesenheit äußerer Zwänge – „Ich kann tun, was ich will." (keine Ketten, kein Zwang)</li>
        <li><strong>Willensfreiheit:</strong> Die Fähigkeit zur Selbstbestimmung des Willens selbst – „Ich kann wollen, was ich will." (Autonomie des Wollens)</li>
      </ul>
      <p>Die Neurobiologie zeigt allenfalls Grenzen der <em>Willensfreiheit</em> – sie sagt wenig über die <em>Handlungsfreiheit</em> im politischen und rechtlichen Sinn.</p>
      
      <h3>3. Der performative Selbstwiderspruch</h3>
      <p>Das schlagkräftigste Argument gegen den radikalen Determinismus ist der <strong>performative Selbstwiderspruch</strong>: Wenn Roth, Singer und Prinz ihre Thesen als wissenschaftlich begründet <em>behaupten</em>, setzen sie voraus, dass ihre Kollegen und Leser diese Gründe rational prüfen und akzeptieren <em>können</em>.</p>
      <div class="quote">„Wenn der Neuro-Determinist recht hat, dann hat er seine These nicht aus rationalen Gründen vertreten – sondern weil sein Gehirn ihn dazu ‚zwang'. Warum sollten wir eine solche These ernst nehmen?" — philosophische Gegenkritik</div>
      <p>Wissenschaftliche Erkenntnis beansprucht, auf <strong>rationalen Gründen</strong> zu beruhen, nicht auf bloß zufälligen neuronalen Verschaltungen. Wer Determinismus behauptet, sägt am Ast, auf dem er sitzt.</p>
      
      <h3>4. Konsequenzen für das Recht</h3>
      <p>Die Forderung nach Abschaffung des Schuldstrafrechts begegnet fundamentalen Einwänden:</p>
      <ul style="margin: 0.75rem 0 0.75rem 1.5rem; color: var(--text-secondary); line-height: 1.8;">
        <li>Ohne Schuldfähigkeit gäbe es kein Fundament für Autonomie und Menschenwürde.</li>
        <li>Das Recht setzt Freiheit als <em>Normalfall</em> voraus – § 20 StGB (Schuldunfähigkeit) ist die begründungspflichtige <em>Ausnahme</em>.</li>
        <li>Täter würden zu bloßen „Opfern ihres Gehirns" – was das menschliche Selbstverständnis fundamental untergrübe.</li>
      </ul>
    `,
    activity: {
      type: 'cases',
      title: '⚙️ Aktivität: Ursache oder Grund?',
      desc: 'Analysiere die folgenden drei Fallbeispiele: Wird das Handeln durch eine physikalische Ursache oder durch einen rationalen Grund erklärt? Entscheide und begründe.',
      cases: [
        {
          id: 'c1',
          scenario: 'Max gibt seiner Freundin eine Tafel Schokolade, weil er ihr damit eine Freude machen möchte.',
          options: ['Ursache (neurobiologisch)', 'Grund (intentional)'],
          correct: 1,
          explanation: 'Dies ist eine Erklärung durch einen <strong>Grund</strong>: Max handelt, weil er ein Ziel verfolgt (Freude bereiten) und es für richtig hält. Diese intentionale Erklärung gehört zur Sprache von Gründen und Absichten – nicht zur kausalen Sprache der Neurobiologie.'
        },
        {
          id: 'c2',
          scenario: 'Der Reflex, die Hand zurückzuziehen, wenn man eine heiße Herdplatte berührt, erfolgt noch vor dem bewussten Schmerzempfinden.',
          options: ['Ursache (neurobiologisch)', 'Grund (intentional)'],
          correct: 0,
          explanation: 'Dies ist eine Erklärung durch eine <strong>Ursache</strong>: Der Schutzreflex ist ein automatischer, unbewusster Mechanismus. Hier liegt kein rationaler Entschluss vor – sondern eine direkte neuronale Reaktionskette ohne intentionale Steuerung.'
        },
        {
          id: 'c3',
          scenario: 'Sophie wählt die Partei X, weil sie deren Programm nach sorgfältiger Prüfung für gerechter hält als das der anderen Parteien.',
          options: ['Ursache (neurobiologisch)', 'Grund (intentional)'],
          correct: 1,
          explanation: 'Dies ist eine Erklärung durch einen <strong>Grund</strong>: Sophie handelt nach rationaler Abwägung, auf der Basis von Werten und Überzeugungen. Diese Art der Erklärung ist genuin normativ – sie lässt sich nicht durch neuronale Prozesse ersetzen, ohne die Handlung als rationale Entscheidung zu verfehlen.'
        }
      ]
    }
  },

  {
    id: 'qualia',
    emoji: '👁️',
    num: 'Kapitel 4',
    title: 'Philosophische Kritik II: Dualismus & Qualia',
    desc: 'Mary\'s Room, die Erklärungslücke, das Anschlussproblem und der interaktionistische Dualismus.',
    color: '#10b981',
    xpReward: 50,
    content: `
      <h3>1. Das Leib-Seele-Problem</h3>
      <p>Hinter der Willensfreiheitsdebatte verbirgt sich ein noch tieferes philosophisches Problem: <strong>Wie verhält sich das physische Gehirn zum subjektiven Erleben?</strong> Dieses „Leib-Seele-Problem" oder „mind-body problem" gehört zu den ältesten und hartnäckigsten Rätseln der Philosophie.</p>
      
      <h3>2. Qualia – das subjektive Erleben</h3>
      <p>Als <strong>Qualia</strong> bezeichnet man die subjektiven Erlebnisgehalte unserer Wahrnehmungen – das „Wie es sich anfühlt", etwas zu erleben. Beispiele:</p>
      <ul style="margin: 0.75rem 0 0.75rem 1.5rem; color: var(--text-secondary); line-height: 2;">
        <li>Das spezifische <em>Rötlichkeit</em> des Rot-Sehens</li>
        <li>Der charakteristische <em>Schmerz</em> bei Kopfweh</li>
        <li>Das <em>Gefühl</em> von Freude oder Trauer</li>
      </ul>
      <p>Qualia sind per Definition <em>subjektiv</em> – sie können von der betreffenden Person direkt erlebt, aber nicht vollständig an eine dritte Person „übertragen" werden.</p>
      
      <h3>3. Marys Zimmer – Das Gedankenexperiment</h3>
      <p>Der Philosoph Frank Jackson hat 1982 ein einflussreiches Gedankenexperiment entwickelt:</p>
      <div class="mary-card">
        <div class="mary-scene">🔬 → 🌈</div>
        <div class="mary-story">
          <strong>Mary ist eine brillante Neurowissenschaftlerin,</strong> die ihr gesamtes Leben in einem schwarz-weißen Zimmer verbracht hat. Sie hat über Bücher und Bildschirme <em>alles</em> gelernt, was es über Farben zu wissen gibt: Wellenlängen, Zapfen im Auge, neuronale Verarbeitungsprozesse im visuellen Kortex, Farbpsychologie...
          <br><br>
          Eines Tages verlässt Mary das Zimmer und sieht <strong>zum ersten Mal eine rote Rose.</strong>
        </div>
      </div>
      
      <h3>4. Die Erklärungslücke (Explanatory Gap)</h3>
      <p>Der Begriff stammt vom Philosophen Joseph Levine (1983). Die <strong>Erklärungslücke</strong> bezeichnet das Problem, dass selbst eine vollständige Beschreibung aller neuronalen Prozesse nicht vermitteln kann, <em>wie es sich anfühlt</em>, etwas Bestimmtes wahrzunehmen.</p>
      <p>Es bleibt eine Lücke zwischen:</p>
      <ul style="margin: 0.75rem 0 0.75rem 1.5rem; color: var(--text-secondary); line-height: 2;">
        <li>der <strong>physikalischen Beschreibung</strong> (Neuronen, Wellenlängen, Aktionspotenziale)</li>
        <li>dem <strong>subjektiven Erleben</strong> (das Qual des Roten, das Qual des Schmerzes)</li>
      </ul>
      <div class="quote">„Warum fühlt es sich überhaupt irgendwie an, bestimmte Gehirnzustände zu haben?" — David Chalmers, „Das schwierige Problem des Bewusstseins"</div>
      
      <h3>5. Das Anschlussproblem (Binding Problem)</h3>
      <p>Eng verwandt ist das <strong>Anschlussproblem</strong>: Wie entstehen aus den vielen verteilten neuronalen Einzelprozessen die <em>einheitliche</em> subjektive Erfahrung? Farbe, Form, Bewegung, Klang werden in verschiedenen Gehirnarealen verarbeitet – aber wir erleben alles als <em>ein zusammenhängendes</em> Bewusstsein.</p>
      
      <h3>6. Interaktionistischer Dualismus (Popper/Eccles)</h3>
      <p>Karl Popper und John Eccles vertraten die Position, dass Geist (Welt 2) und Materie (Welt 1) zwei ontologisch verschiedene Entitäten sind, die <em>kausal miteinander interagieren</em>. Das Bewusstsein greift real in das Geschehen ein.</p>
      <p>Das Hauptproblem dieser Position: das <strong>Prinzip der kausalen Geschlossenheit</strong> der physikalischen Welt (→ Kapitel 5).</p>
    `,
    activity: {
      type: 'marys_room',
      title: '👁️ Aktivität: Marys Zimmer – deine Entscheidung',
      desc: 'Mary verlässt ihr schwarz-weißes Zimmer. Was denkst du: Lernt sie etwas Neues, als sie die rote Rose sieht?'
    }
  },

  {
    id: 'kompatibilismus',
    emoji: '🌿',
    num: 'Kapitel 5',
    title: 'Lösungsansätze: Kompatibilismus & Autonomie',
    desc: 'Kausale Geschlossenheit, Kants Autonomie, Frankfurts Wünsche zweiter Ordnung, Kompatibilismus und die Veto-Option.',
    color: '#10b981',
    xpReward: 50,
    content: `
      <h3>1. Das Prinzip der kausalen Geschlossenheit</h3>
      <p>Das stärkste Argument gegen den interaktionistischen Dualismus ist das <strong>Prinzip der kausalen Geschlossenheit der physikalischen Welt</strong>:</p>
      <div class="quote">„Jedes physikalische Ereignis hat hinreichende physikalische Ursachen. Wenn ein immaterieller Geist kausal in physikalische Prozesse eingreifen würde, müsste er Energie übertragen – was das Energieerhaltungsgesetz verletzen würde."</div>
      <p>Konsequenz: Entweder ist der Geist kausal wirkungslos (<strong>Epiphänomenalismus</strong>) – oder er ist physikalischer Natur. Der Dualismus gerät so unter erheblichen Druck.</p>
      
      <h3>2. Immanuel Kant: Autonomie und die zwei Welten</h3>
      <p>Kant löst das Problem durch eine radikale Unterscheidung: Der Mensch ist <strong>Bürger zweier Welten</strong>:</p>
      <ul style="margin: 0.75rem 0 0.75rem 1.5rem; color: var(--text-secondary); line-height: 1.8;">
        <li><strong>Als Naturwesen:</strong> Unterliegt der Kausalität der Erscheinungswelt (Phänomene). Hier gilt: Determinismus.</li>
        <li><strong>Als Vernunftwesen:</strong> Kann sich durch den kategorischen Imperativ selbst moralische Gesetze geben. Hier gilt: Freiheit.</li>
      </ul>
      <p><strong>Autonomie</strong> (von gr. autos = selbst, nomos = Gesetz) bedeutet bei Kant: <em>Selbstgesetzlichkeit</em>. Der Mensch ist frei, wenn er aus Einsicht in das Sittengesetz handelt – gegen bloße Neigungen.</p>
      
      <h3>3. Harry G. Frankfurt: Wünsche zweiter Ordnung</h3>
      <p>Harry Frankfurt hat einen modernen, psychologisch differenzierten Begriff von Willensfreiheit entwickelt, der ohne Metaphysik auskommt:</p>
      <ul style="margin: 0.75rem 0 0.75rem 1.5rem; color: var(--text-secondary); line-height: 1.8;">
        <li><strong>Wünsche 1. Ordnung (W1):</strong> Konkrete Handlungsbedürfnisse. Beispiel: „Ich möchte jetzt eine Zigarette rauchen."</li>
        <li><strong>Wünsche 2. Ordnung (W2):</strong> Reflexion über diese Bedürfnisse. Beispiel: „Ich möchte ein Mensch sein, der keine Zigaretten mehr will."</li>
        <li><strong>Volitionen:</strong> Wünsche 2. Ordnung, die handlungswirksam werden – also tatsächlich das Verhalten steuern.</li>
      </ul>
      <div class="quote">„Ein Mensch handelt frei, wenn seine handlungswirksamen Wünsche diejenigen sind, die er haben möchte – wenn W1 und W2 übereinstimmen." — Harry G. Frankfurt</div>
      <p>Ein Süchtiger ist unfrei, weil sein W1 (die Sucht) seinem W2 (Suchtfreiheit) widerspricht. Freiheit ist hier kohärente <strong>Selbstidentifikation</strong>.</p>
      
      <h3>4. Kompatibilismus: Freiheit trotz Determinismus</h3>
      <p>Kompatibilisten wie <strong>Ansgar Beckermann</strong> und <strong>Peter Bieri</strong> argumentieren, dass Determinismus und Freiheit kein Widerspruch sind:</p>
      <div class="quote">„Eine Entscheidung ist frei, wenn sie das Resultat eines neuronalen Prozesses ist, der ein rationales Abwägen von Gründen implementiert – unabhängig davon, ob dieser Prozess determiniert ist." — Ansgar Beckermann</div>
      <p>Entscheidend ist <em>nicht</em>, ob eine Entscheidung kausal determiniert ist, sondern <em>wodurch</em>: durch Zwang und Manipulation (unfrei) oder durch eigene Überzeugungen und Werte (frei).</p>
      
      <h3>5. Freiheit als Kulturleistung – das Fazit</h3>
      <p>Die neurobiologische Infragestellung der Willensfreiheit hat die Debatte geschärft – konnte den freien Willen aber nicht als bloße Illusion entlarven. Ein qualifizierter Freiheitsbegriff setzt keine Unabhängigkeit von Naturgesetzen voraus, sondern:</p>
      <ul style="margin: 0.75rem 0 0.75rem 1.5rem; color: var(--text-secondary); line-height: 1.8;">
        <li>Rationale <strong>Selbstbestimmung</strong> und Reflexionsfähigkeit</li>
        <li>Kohärenz zwischen W1 und W2 (Frankfurt)</li>
        <li>Die Fähigkeit, für das eigene Handeln <strong>Verantwortung</strong> zu übernehmen</li>
      </ul>
      <div class="quote">„Freiheit ist weniger ein biologisches Faktum als vielmehr eine fragile <strong>Kulturleistung</strong>, die durch Erziehung und Reflexion erarbeitet und bewahrt werden muss." — aus dem Analysepapier</div>
    `,
    activity: {
      type: 'argument_map',
      title: '🌿 Aktivität: Pro & Contra Willensfreiheit',
      desc: 'Wähle aus den folgenden Argumenten die passenden für die Pro- und Contra-Seite aus. Positioniere dich anschließend auf dem Schieberegler.'
    }
  }
];

// ─── QUIZ ───────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    q: 'Was maß Benjamin Libet im EEG, bevor Probanden eine Handbewegung ausführten?',
    options: ['Alphawellen', 'Das Bereitschaftspotenzial (BP)', 'Den Schlafrhythmus', 'Theta-Oszillationen'],
    correct: 1,
    explanation: 'Das Bereitschaftspotenzial ist eine langsam ansteigende negative Spannungsverschiebung, die der willkürlichen Bewegung etwa 550 ms vorausgeht.'
  },
  {
    q: 'Welche Zeitspanne liegt nach Libet zwischen dem Beginn des Bereitschaftspotenzials und dem bewussten Willensdrang (W-Zeitpunkt)?',
    options: ['ca. 50 ms', 'ca. 200 ms', 'ca. 350 ms', 'ca. 2 Sekunden'],
    correct: 2,
    explanation: 'Das BP beginnt ca. 550 ms vor der Bewegung, der W-Zeitpunkt tritt ca. 200 ms vorher auf – also beträgt der Abstand ca. 350 ms.'
  },
  {
    q: 'Was beschreibt die sog. „Free Won\'t" im Kontext des Libet-Experiments?',
    options: [
      'Die Freiheit, neue Gewohnheiten zu entwickeln',
      'Die Fähigkeit, eine bereits eingeleitete Handlung noch zu stoppen',
      'Die freie Wahl zwischen zwei Handlungsalternativen',
      'Die unbewusste Initiierung von Handlungen'
    ],
    correct: 1,
    explanation: 'Libet und später Schultze-Kraft/Haynes (2016) zeigten, dass das Bewusstsein eine Veto-Funktion hat: eingeleitete Handlungen können bis zum „Point of no Return" abgebrochen werden.'
  },
  {
    q: 'Was versteht Gerhard Roth unter „Konfabulation" im Kontext der Willensfreiheit?',
    options: [
      'Eine bewusste Lüge über eigene Handlungen',
      'Die nachträgliche Konstruktion einer rationalen Begründung für unbewusst verursachte Handlungen',
      'Das Phänomen der Gedächtnistäuschung',
      'Ein Experiment zur Messung von Willensfreiheit'
    ],
    correct: 1,
    explanation: 'Konfabulation bezeichnet das Phänomen, bei dem das Bewusstsein für Handlungen, die durch unbewusste Hirnprozesse verursacht wurden, nachträglich plausible, aber fiktive rationale Begründungen erfindet.'
  },
  {
    q: 'Welche der folgenden Positionen vertreten Roth, Singer und Prinz GEMEINSAM?',
    options: [
      'Der Kompatibilismus ist die überzeugendste Position',
      'Willensfreiheit ist mit Determinismus vereinbar',
      'Das Vergeltungsprinzip im Strafrecht sollte überdacht werden',
      'Qualia beweisen die Existenz eines immateriellen Geistes'
    ],
    correct: 2,
    explanation: 'Alle drei fordern Konsequenzen für das Schuldstrafrecht: Da niemand für seine Gehirnstruktur verantwortlich ist, solle das Vergeltungsprinzip durch präventive Maßnahmen ersetzt werden.'
  },
  {
    q: 'Was ist ein „Kategorienfehler" (category mistake) in der philosophischen Kritik an der Neurobiologie?',
    options: [
      'Ein Fehler in der Auswertung neuronaler Daten',
      'Die Verwechslung von Korrelation und Kausalität',
      'Die fehlerhafte Anwendung von Begriffen einer Ebene (Gründe) auf eine andere (physikalische Ursachen)',
      'Das fehlerhafte Klassifizieren von Hirnarealen'
    ],
    correct: 2,
    explanation: 'Der Kategorienfehler liegt vor, wenn die semantische Ebene der Gründe (intentionale Erklärungen) mit der empirischen Ebene neuronaler Impulse (Kausalerklärungen) verwechselt wird.'
  },
  {
    q: 'Was versteht Frank Jackson unter „Qualia"?',
    options: [
      'Messbare Größen der Hirnaktivität',
      'Subjektive Erlebnisqualitäten (z.B. das „Rötlichkeit" des Rot-Sehens)',
      'Abstrakte philosophische Kategorien',
      'Quantitative Messungen der Reizverarbeitung'
    ],
    correct: 1,
    explanation: 'Qualia sind subjektive Erlebnisgehalte – das, wie es sich anfühlt, etwas zu erleben. Sie entziehen sich einer rein physikalischen, objektiven Beschreibung.'
  },
  {
    q: 'Was illustriert das Gedankenexperiment „Marys Zimmer"?',
    options: [
      'Dass Wahrnehmung ohne Licht unmöglich ist',
      'Dass physikalisches Wissen das subjektive Erleben (Qualia) nicht vollständig erfassen kann',
      'Dass Frauen bessere Wissenschaftlerinnen sind',
      'Dass das Bereitschaftspotenzial bewusst gesteuert wird'
    ],
    correct: 1,
    explanation: 'Mary weiß alles über Farben, lernt aber dennoch etwas Neues, als sie zum ersten Mal Rot sieht. Dies zeigt, dass physikalisch-funktionales Wissen das subjektive Erleben nicht vollständig beschreibt – es besteht eine Erklärungslücke.'
  },
  {
    q: 'Was meint Harry Frankfurt mit „Wünschen zweiter Ordnung"?',
    options: [
      'Wünsche, die nach einer gewissen Wartezeit entstehen',
      'Wünsche über eigene Wünsche – Reflexionen auf die eigenen Bedürfnisse',
      'Kollektive gesellschaftliche Bedürfnisse',
      'Wünsche, die im Unterbewusstsein verankert sind'
    ],
    correct: 1,
    explanation: 'Wünsche zweiter Ordnung sind Reflexionen über Wünsche erster Ordnung – z.B. der Wunsch, den Wunsch nach Zigaretten nicht mehr zu haben. Sie ermöglichen nach Frankfurt echte Autonomie.'
  },
  {
    q: 'Was ist der Kern der kompatibilistischen Position zur Willensfreiheit?',
    options: [
      'Freiheit existiert nur außerhalb der Naturgesetze',
      'Determinismus und Freiheit schließen sich grundsätzlich aus',
      'Eine Entscheidung ist frei, wenn sie durch rationale Gründe – nicht durch Zwang – bestimmt ist',
      'Das Gehirn kann Naturgesetze überwinden'
    ],
    correct: 2,
    explanation: 'Kompatibilisten wie Beckermann argumentieren: Freiheit bedeutet nicht Abwesenheit von Ursachen, sondern Bestimmung durch die richtigen Ursachen – nämlich rationale Gründe statt Zwang oder Manipulation.'
  },
  {
    q: 'Wahr oder Falsch: Das Haynes-Experiment (fMRT) konnte Entscheidungen bis zu 10 Sekunden vor dem bewussten Entschluss vorhersagen.',
    options: ['Wahr', 'Falsch'],
    correct: 0,
    explanation: 'Wahr. Die Haynes-Studien ab 2008 zeigten, dass Aktivitätsmuster im präfrontalen Kortex Entscheidungen zwischen zwei Alternativen bis zu 7–10 Sekunden vor dem bewussten Erleben des Entschlusses vorhersagen.'
  },
  {
    q: 'Wahr oder Falsch: Kant lehnt es ab, den Menschen als Naturwesen zu betrachten.',
    options: ['Wahr', 'Falsch'],
    correct: 1,
    explanation: 'Falsch. Kant akzeptiert, dass der Mensch als Naturwesen der Kausalität unterliegt. Freiheit sieht er jedoch im Vernunftwesen – der Fähigkeit zur Selbstgesetzgebung im Bereich der Moral.'
  },
  {
    q: 'Wahr oder Falsch: Die „Erklärungslücke" besagt, dass es prinzipiell unmöglich ist, das Bewusstsein naturwissenschaftlich zu erklären.',
    options: ['Wahr', 'Falsch'],
    correct: 1,
    explanation: 'Falsch (oder zumindest: so nicht). Die Erklärungslücke beschreibt eine aktuelle, möglicherweise prinzipielle Schwierigkeit – sie ist aber keine bewiesene Unmöglichkeit. Sie ist ein offenes philosophisches Problem, kein endgültiger Beweis.'
  },
  {
    q: 'Welche Hirnstruktur identifiziert Gerhard Roth als zentralen Sitz der unbewussten Letztentscheidung?',
    options: ['Präfrontaler Kortex', 'Kleinhirn (Cerebellum)', 'Limbisches System (Basalganglien, Amygdala)', 'Hippocampus'],
    correct: 2,
    explanation: 'Roth postuliert, dass das limbische System – insbesondere Basalganglien und Amygdala – als „Handlungsgedächtnis" die eigentliche Letztentscheidung trifft, dem Bewusstsein unzugänglich.'
  },
  {
    q: 'Was beschreibt das „Prinzip der kausalen Geschlossenheit der physikalischen Welt"?',
    options: [
      'Physikalische Gesetze gelten nur im geschlossenen Laborraum',
      'Jedes physikalische Ereignis hat hinreichende physikalische Ursachen – kein immaterielles Agens kann eingreifen',
      'Das Universum ist ein geschlossenes thermodynamisches System',
      'Bewusstsein ist kausal mit dem Gehirn identisch'
    ],
    correct: 1,
    explanation: 'Das Prinzip besagt: Jedes physikalische Ereignis hat vollständige physikalische Ursachen. Ein immaterieller Geist, der kausal eingriffe, müsste Energie übertragen – und würde damit das Energieerhaltungsgesetz verletzen. Dies ist das Hauptproblem des interaktionistischen Dualismus.'
  }
];

// ─── GLOSSARY ───────────────────────────────────────────────────────
const GLOSSARY = [
  { term: 'Autonomie', def: 'Selbstgesetzlichkeit; die Fähigkeit, nach selbst gegebenen Regeln zu handeln und sich durch Vernunfteinsicht oder Identifikation mit Werten selbst zu bestimmen.' },
  { term: 'Basalganglien', def: 'Hirnstrukturen, die als „Handlungsgedächtnis" fungieren und laut Roth unbewusst die Letztentscheidung über Bewegungen treffen.' },
  { term: 'Bereitschaftspotenzial (BP)', def: 'Eine im EEG messbare negative Spannungsverschiebung im Gehirn, die einer willkürlichen Bewegung ca. 550 ms zeitlich vorausgeht.' },
  { term: 'Determinismus', def: 'Die philosophische Auffassung, dass alle Ereignisse durch Vorbedingungen (Naturgesetze, Vergangenheit) eindeutig und notwendig festgelegt sind.' },
  { term: 'Epiphänomenalismus', def: 'Die Theorie, dass Bewusstsein nur eine kausal wirkungslose Begleiterscheinung (Nebenprodukt) physikalischer Hirnprozesse ist.' },
  { term: 'Erklärungslücke', def: 'Das philosophische Problem, dass physikalisch-funktionale Beschreibungen das subjektive Erleben (Qualia) nicht vollständig erfassen können.' },
  { term: 'Identifikation', def: 'Bei Frankfurt: Der Prozess, durch den sich eine Person mit einem Wunsch 2. Ordnung so verbindet, dass er zum Ausdruck ihres wahren Willens wird.' },
  { term: 'Kausalprinzip', def: 'Die Annahme, dass jedes Ereignis eine hinreichende physikalische Ursache hat; oft als „kausale Geschlossenheit der Welt" bezeichnet.' },
  { term: 'Kategorienfehler', def: 'Fehler, der entsteht, wenn Begriffe einer logischen Kategorie (z.B. mentale Gründe) fälschlicherweise auf eine andere (z.B. physikalische Ursachen) angewendet werden.' },
  { term: 'Kompatibilismus', def: 'Die Position, dass Willensfreiheit und Determinismus vereinbar sind, da Freiheit als Handeln aus rationalen Gründen – nicht als Abwesenheit von Kausalität – definiert wird.' },
  { term: 'Konfabulation', def: 'Das Phänomen, bei dem Probanden für unbewusst verursachte Handlungen nachträglich eine plausible, aber fiktive rationale Begründung erfinden.' },
  { term: 'Limbisches System', def: 'Funktionseinheit des Gehirns für emotionale Bewertung und Konditionierung; laut Roth die Instanz, die das „erste und letzte Wort" bei Entscheidungen hat.' },
  { term: 'Point of no Return', def: 'Der Zeitpunkt (ca. 200 ms vor einer Bewegung), ab dem eine neuronale Kaskade physisch nicht mehr durch ein Veto gestoppt werden kann.' },
  { term: 'Qualia', def: 'Subjektive Erlebnisgehalte (z.B. das Gefühl von „Rot"), die sich einer rein objektiven, physikalischen Beschreibung entziehen.' },
  { term: 'Veto-Funktion', def: 'Die Fähigkeit des bewussten Willens, eine bereits unbewusst eingeleitete Handlung kurz vor der Ausführung zu stoppen („Free Won\'t").' },
  { term: 'Volitionen', def: 'Handlungswirksame Wünsche; bei Frankfurt speziell Wünsche zweiter Ordnung, die den Willen tatsächlich bestimmen und in Handlungen überführen.' },
  { term: 'Performativer Selbstwiderspruch', def: 'Ein Widerspruch zwischen dem Inhalt einer Aussage und dem Akt, sie zu äußern – z.B. wenn ein Determinist seine These als rational begründet behauptet.' },
];

// ─── BADGES ────────────────────────────────────────────────────────
const BADGES_DEF = [
  { id: 'libet_done', emoji: '🧪', name: 'Libet-Labor', desc: 'Kapitel 1 abgeschlossen' },
  { id: 'neuro_done', emoji: '🧠', name: 'Neuronales Netz', desc: 'Kapitel 2 abgeschlossen' },
  { id: 'gruende_done', emoji: '⚙️', name: 'Kategorienkenner:in', desc: 'Kapitel 3 abgeschlossen' },
  { id: 'qualia_done', emoji: '👁️', name: 'Qualia-Forscher:in', desc: 'Kapitel 4 abgeschlossen' },
  { id: 'kompatibilismus_done', emoji: '🌿', name: 'Kompatibilist:in', desc: 'Kapitel 5 abgeschlossen' },
  { id: 'all_done', emoji: '⚖️', name: 'Kritischer Kopf', desc: 'Alle 5 Kapitel + Reflexionen abgeschlossen' },
  { id: 'freigeist', emoji: '🏆', name: 'Freigeist', desc: 'Quiz ≥ 80% + Argumentationsaufgabe eingereicht' },
];

// ─── LEVELS ────────────────────────────────────────────────────────
const LEVELS = [
  { min: 0,   emoji: '🌱', name: 'Lernende:r',    num: 1 },
  { min: 100, emoji: '💡', name: 'Denkende:r',    num: 2 },
  { min: 250, emoji: '🔍', name: 'Kritiker:in',   num: 3 },
  { min: 400, emoji: '📚', name: 'Philosoph:in',  num: 4 },
  { min: 600, emoji: '🏆', name: 'Freigeist',     num: 5 },
];

function getLevel(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) return LEVELS[i];
  }
  return LEVELS[0];
}

function getNextLevel(xp) {
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp < LEVELS[i].min) return LEVELS[i];
  }
  return null;
}
