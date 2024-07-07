const now = new Date().toISOString().substring(0, 10);
const testBasic = [
  ["Task", `${now} Task`],
  ["   Task   ", `${now} Task`],
  ["Task with many words", `${now} Task with many words`],
  ["   Task with many words  ", `${now} Task with many words`],
  ["Task          with many words", `${now} Task with many words`],
  ["Task          with    many     words     \t \t", `${now} Task with many words`],
  [
    "\n \n Task          with    many     words     \t \t",
    `${now} Task with many words`,
  ],
];
const testPriority = [
  ["(A) Task", `(A) ${now} Task`],
  ["(B) Task", `(B) ${now} Task`],
  ["  (B) Task", `(B) ${now} Task`],
  ["Task (A)", `${now} Task (A)`],
  [" (A) Task with many words", `(A) ${now} Task with many words`],
];
const testDate = [
  ["1982-10-28 1928-10-25 Task", `1928-10-25 Task`],
  ["1928-10-25 Task", `1928-10-25 Task`],
  ["   1928-10-25 Task", `1928-10-25 Task`],
  ["1928-1-2 Task", `${now} 1928-1-2 Task`],
];
const testDatePriority = [
  ["(A)  1982-10-28 1928-10-25 Task", `(A) 1928-10-25 Task`],
  ["(A) 1928-10-25 Task", `(A) 1928-10-25 Task`],
  [" (A)  1928-10-25 Task", `(A) 1928-10-25 Task`],
  ["  1928-10-25 (A) Task", `1928-10-25 (A) Task`],
  ["  1928-10-25 Task (A)   ", `1928-10-25 Task (A)`],
];
const testCompletion = [
  ["x Task", `x ${now} ${now} Task`],
  ["x (A) Task", `x ${now} ${now} Task`],
  [" x (B)   Task", `x ${now} ${now} Task`],
  ["x 1982-10-25 Task", `x ${now} 1982-10-25 Task`],
  ["x 1982-10-28 1928-10-25 Task", `x 1982-10-28 1928-10-25 Task`],
  ["x   (A)   1982-10-25 Task", `x ${now} 1982-10-25 Task`],
  ["x   (A)   1982-10-28 1928-10-25 Task", `x 1982-10-28 1928-10-25 Task`],
];

const allTests = [
  ...testBasic,
  ...testPriority,
  ...testDate,
  ...testDatePriority,
  ...testCompletion,
];
allTests.forEach(([test, expect]) => {
  const todo = new Todo(test);
  const fullText = todo.getFullText();
  console.assert(
    expect === fullText,
    "`%s` — expected: `%s` — result: `%s`",
    test,
    expect,
    fullText,
  );
});
