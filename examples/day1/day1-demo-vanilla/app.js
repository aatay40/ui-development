const outputEl = document.getElementById('output');
const listEl = document.getElementById('demo-list');
const clearBtn = document.getElementById('clear');

function reset(){ outputEl.textContent = ''; }
function log(line=''){
  const t = (line ?? '').toString();
  console.log(t);
  outputEl.textContent += (outputEl.textContent ? '\n' : '') + t;
}
function section(title){ log(''); log('=== ' + title + ' ==='); }
function value(label, v){
  let s;
  try{ s = (typeof v === 'string') ? v : JSON.stringify(v, null, 2); }
  catch{ s = String(v); }
  log(label + ': ' + s);
}

clearBtn.addEventListener('click', reset);

function fakeFetch(label, ms=350, shouldFail=false){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(shouldFail) reject(new Error('Network error for ' + label));
      else resolve({label, at: new Date().toISOString()});
    }, ms);
  });
}

const demos = [];
function addDemo(d){ demos.push(d); }

// --------------------
// Day 1 demos
// Each demo contains >= 3 micro-examples.
// --------------------

addDemo({
  id:'vars',
  title:'var vs let vs const (scope + hoisting)',
  notes:'Predict output first. Rule: const by default, let if reassigned, avoid var.',
  run: async () => {
    reset();
    section('Example 1: var leaks from blocks');
    if (true) { var x = 5; }
    value('x after if block', x);

    section('Example 2: let is block-scoped');
    try { if (true) { let y = 10; value('y inside block', y); } value('y outside block', y); }
    catch { log('Accessing y outside block throws (expected).'); }

    section('Example 3: hoisting');
    value('v before assignment (var)', v);
    var v = 3;
    value('v after assignment', v);

    section('Example 4: const cannot be reassigned');
    const n = 1;
    value('n', n);
    log('Uncommenting: n = 2 would throw TypeError');
  }
});

addDemo({
  id:'const-mutation',
  title:'const mutation trap (reference vs value)',
  notes:'const locks the reference, not the contents. Tie to UI state: copy, do not mutate.',
  run: async () => {
    reset();
    section('Example 1: object mutation works');
    const user = { name: 'Ali' };
    user.name = 'Sara';
    value('user', user);

    section('Example 2: reassign does not');
    log('Uncommenting: user = {name:"X"} would throw TypeError');

    section('Example 3: array mutation works (but avoid for state)');
    const list = [1,2];
    list.push(3);
    value('list after push', list);

    section('Example 4: preferred copy');
    const next = [...list, 4];
    value('original', list);
    value('copied', next);
  }
});

addDemo({
  id:'destructuring',
  title:'Destructuring objects + arrays',
  notes:'Call it unpacking. Connect to React props: function Card({title}) {}',
  run: async () => {
    reset();
    section('Example 1: object destructuring');
    const u = { id: 1, name: 'Sara', role: 'Admin' };
    const { name, role } = u;
    value('name', name);
    value('role', role);

    section('Example 2: rename + default');
    const u2 = { name: 'Ali' };
    const { name: displayName, role: fallbackRole = 'Guest' } = u2;
    value('displayName', displayName);
    value('fallbackRole', fallbackRole);

    section('Example 3: array destructuring + swap');
    let a = 1, b = 2;
    [a, b] = [b, a];
    value('a', a); value('b', b);
  }
});

addDemo({
  id:'templates',
  title:'Template literals + multiline',
  notes:'Rewrite a + concatenation into a template literal.',
  run: async () => {
    reset();
    section('Example 1: interpolation');
    const who = 'Sara';
    value('template', `Hello, ${who}!`);

    section('Example 2: multiline');
    const msg = `Line 1\nLine 2\nLine 3`;
    value('msg', msg);

    section('Example 3: small HTML generation');
    const users = ['Ali','Sara'];
    const html = `<ul>${users.map(u => `<li>${u}</li>`).join('')}</ul>`;
    value('html', html);
  }
});

addDemo({
  id:'spread',
  title:'Spread operator (...) for copy + merge',
  notes:'Say: spread makes a new value. Good for state updates.',
  run: async () => {
    reset();
    section('Example 1: copy array + add');
    const oldTasks = ['Eat','Sleep'];
    const newTasks = [...oldTasks, 'Code'];
    value('oldTasks', oldTasks);
    value('newTasks', newTasks);

    section('Example 2: copy object + override');
    const user = { name:'Ali', age:20 };
    const updated = { ...user, age:21 };
    value('user', user);
    value('updated', updated);

    section('Example 3: merge arrays');
    const merged = [...[1,2], ...[3,4]];
    value('merged', merged);
  }
});

addDemo({
  id:'array-methods',
  title:'map / filter / find',
  notes:"Make them say it: 'map transforms', 'filter keeps', 'find returns one'.",
  run: async () => {
    reset();
    section('Example 1: map transforms');
    const nums = [1,2,3];
    value('nums.map(n=>n*2)', nums.map(n=>n*2));

    section('Example 2: filter keeps');
    value('filter even', [1,2,3,4].filter(n=>n%2===0));

    section('Example 3: find returns first match');
    const people = [{id:1,n:'Ali'},{id:2,n:'Sara'},{id:3,n:'Nora'}];
    value('find id=2', people.find(p=>p.id===2));
  }
});

addDemo({
  id:'optional',
  title:'Optional chaining (?.) and nullish coalescing (??)',
  notes:'?. avoids crashes. ?? defaults only for null/undefined (not 0/"").',
  run: async () => {
    reset();
    section('Example 1: without ?. you crash');
    const data = { user: null };
    try { value('data.user.name', data.user.name); }
    catch { log('Crash (expected)'); }

    section('Example 2: with ?.');
    value('data.user?.name', data.user?.name);

    section('Example 3: ?? vs ||');
    const a = 0;
    value('0 || 99', a || 99);
    value('0 ?? 99', a ?? 99);
  }
});

addDemo({
  id:'promise',
  title:'Promises (then/catch, all, race)',
  notes:'Draw timeline: pending → fulfilled/rejected. then() returns a new Promise.',
  run: async () => {
    reset();

    section('Example 1: then/catch (success)');
    await fakeFetch('OK', 250)
      .then(r => { value('resolved', r.label); return 'next'; })
      .then(v => value('chained value', v))
      .catch(e => log('unexpected: ' + e.message));

    section('Example 2: catch (failure)');
    await fakeFetch('FAIL', 250, true)
      .then(r => value('resolved', r))
      .catch(e => value('caught error', e.message));

    section('Example 3: Promise.all parallel');
    const t0 = Date.now();
    const res = await Promise.all([
      fakeFetch('A', 250),
      fakeFetch('B', 250)
    ]);
    value('labels', res.map(r=>r.label));
    value('elapsed_ms', Date.now() - t0);

    section('Bonus: Promise.race timeout');
    const timeout = new Promise((_,rej)=>setTimeout(()=>rej(new Error('Timed out')),200));
    try {
      await Promise.race([fakeFetch('Slow', 400), timeout]);
      log('unexpected');
    } catch(e){
      value('race result', e.message);
    }
  }
});

addDemo({
  id:'async-await',
  title:'async/await (sequential, errors, parallel)',
  notes:'Translate then/catch into try/catch. await pauses THIS async function only.',
  run: async () => {
    reset();

    section('Example 1: sequential awaits (slower)');
    const t0 = Date.now();
    const r1 = await fakeFetch('S1', 200);
    const r2 = await fakeFetch('S2', 200);
    value('labels', [r1.label, r2.label]);
    value('elapsed_ms', Date.now() - t0);

    section('Example 2: try/catch for rejection');
    try {
      await fakeFetch('Boom', 150, true);
      log('unexpected');
    } catch(e){
      value('caught', e.message);
    }

    section('Example 3: parallel with Promise.all');
    const t1 = Date.now();
    const [p1,p2] = await Promise.all([fakeFetch('P1',200), fakeFetch('P2',200)]);
    value('labels', [p1.label, p2.label]);
    value('elapsed_ms', Date.now() - t1);
  }
});

addDemo({
  id:'async-map',
  title:'Async-in-map trap + Promise.all',
  notes:'map(async) returns Promises. Fix: await Promise.all(...)',
  run: async () => {
    reset();

    section('Example 1: map(async) returns promises');
    const ids = [1,2,3];
    const promises = ids.map(async (id) => {
      const r = await fakeFetch('id-' + id, 120);
      return r.label;
    });
    value('isPromise', promises.map(p => p instanceof Promise));

    section('Example 2: fix with Promise.all');
    const values = await Promise.all(promises);
    value('values', values);

    section('Example 3: for...of is simplest for sequential');
    const seq = [];
    for (const id of ids) {
      const r = await fakeFetch('seq-' + id, 80);
      seq.push(r.label);
    }
    value('seq', seq);
  }
});

function render(){
  listEl.innerHTML='';
  for (const d of demos) {
    const item = document.createElement('div');
    item.className='demo-item';

    const title = document.createElement('div');
    title.className='demo-title';
    title.textContent=d.title;

    const btn = document.createElement('button');
    btn.className='primary';
    btn.textContent='Run';
    btn.addEventListener('click', async () => {
      reset();
      section(d.title);
      log('Teacher note: ' + d.notes);
      try { await d.run(); }
      catch (e) { log('ERROR: ' + (e?.message ?? e)); }
    });

    const notes = document.createElement('p');
    notes.className='demo-notes';
    notes.textContent=d.notes;

    item.append(title, btn, notes);
    listEl.appendChild(item);
  }
}

clearBtn.addEventListener('click', () => reset());
render();
