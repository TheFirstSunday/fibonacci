import { SyncRule } from '@commitlint/types';

const DEFAULT_CASE_TYPES = ['feat', 'fix'];
const JIRA_ID_MATCH_REGEX = /^[A-Z]+_?[A-Z]+-\d+.*\S+$/;

const jiraIdNotEmpty: SyncRule<string[]> = (
  parsed,
  _when = 'always',
  caseTypes = DEFAULT_CASE_TYPES,
) => {
  const isTypeMatch = caseTypes.includes(parsed.type as string);

  return [
    isTypeMatch ? JIRA_ID_MATCH_REGEX.test(parsed.subject?.trim() ?? '') : true,
    `subject must start with jira id, if type is one of ${caseTypes.join(',')}`,
  ];
};

export default jiraIdNotEmpty;
