# Option Verdict Redesign Requirements

## Product Goal

DecisionSimulator must help a user decide which option is best among several choices. The core user job is not "score my question"; it is:

> I am stuck between A, B, and maybe C/D. Help me think clearly, compare them fairly, and tell me which option wins.

## Primary User Flow

1. User immediately understands the product:
   - The page explains that this is a multi-option decision judge.
   - The first visible workflow is the decision input, not a marketing page.
2. User enters:
   - The decision question.
   - Option A.
   - Option B.
   - Optional extra options through a clear plus button.
3. User clicks analyze.
4. The product shows a staged analysis process with enough time and ceremony:
   - Clarifying the real decision.
   - Comparing each option's upside.
   - Stress-testing each option's downside.
   - Running a multi-role debate.
   - Scoring options.
   - Declaring a winner.
5. Final output must be decisive:
   - "Option A/B/C wins."
   - Show final score ranking.
   - Show why the winning option wins.
   - Show each option's pros and cons.
   - Show debate notes from different roles.
   - Give a practical next step.

## Agent Roles

- Optimist: argues for each option's upside.
- Skeptic: attacks each option's weaknesses and hidden costs.
- Pragmatist: evaluates feasibility and execution.
- Future Self: evaluates regret, long-term fit, and emotional reality.
- Judge: weighs the debate and declares the winner.

## Acceptance Criteria

- The main form has only decision question, options, add option, and analyze controls.
- Two option inputs are visible by default.
- Extra options can be added up to five.
- The result page visually amplifies the winner.
- The result page includes option scores, pros, cons, and win/loss reasoning.
- The analysis progress page shows staged dynamic work and does not finish instantly.
- If no API key is configured, the tool still returns a coherent option verdict demo instead of generic placeholder output.

## Development Plan

1. Replace the input form with a simplified option-comparison form.
2. Rebuild the orchestration layer around option verdicts and multi-role debate.
3. Redesign progress steps and logs around the new role sequence.
4. Replace the result layout with a winner-first verdict page.
5. Verify language switching still works for the main workflow.
6. Run type check, production build, browser test, review, commit, and push.
