import { createSelector } from '@reduxjs/toolkit';
import { selectSearchQuery } from '@features/search/model';
import { selectAllSkills } from '@app/store/db/selectors';

export const selectFilteredSkills = createSelector(
  [selectAllSkills, selectSearchQuery],
  (skills, query) => {
    if (!query.trim()) return skills;

    const lowerQuery = query.toLowerCase();

    return skills?.filter((skill) => skill.title.toLowerCase().includes(lowerQuery));
  },
);
