import * as ensure from '@commitlint/ensure';
import { SyncRule } from '@commitlint/types';

const DEFAULT_CASE_TYPES = ['feat', 'fix'];

const scopeNotEmpty: SyncRule<string[]> = (
  parsed,
  _when = 'always',
  caseTypes = DEFAULT_CASE_TYPES,
) => {
  const notEmpty = ensure.notEmpty(parsed.scope || '');
  const isTypeMatch = caseTypes.includes(parsed.type as string);

  return [
    isTypeMatch ? notEmpty : true,
    `scope may not be empty, if type is one of ${caseTypes.join(',')}`,
  ];
};

export default scopeNotEmpty;
