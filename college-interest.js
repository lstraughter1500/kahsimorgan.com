(() => {
  // Sort by displayed school name so future additions stay alphabetical.
  const alphabet = new Intl.Collator('en', { sensitivity: 'base' });
  document.querySelectorAll('.college-school-grid').forEach((list) => {
    const schools = Array.from(list.children);
    const name = (school) => school.querySelector('strong')?.textContent.trim() || '';
    schools.sort((a, b) => alphabet.compare(name(a), name(b)));
    list.replaceChildren(...schools);
  });
})();
