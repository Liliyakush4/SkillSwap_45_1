import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ProfileImage {
  src: string;
  alt?: string;
}

export interface ProfileState {
  profile: {
    email: string;
    name: string;
    birthDate: Date | null;
    gender: string;
    city: string;
    about: string;
    avatarSrc?: string;
  };
  skill: {
    title: string;
    description: string;
    level: number;
    category: string;
    images: ProfileImage[];
    tags: string[];
    isPublic: boolean;
  };
}

const initialState: ProfileState = {
  profile: {
    email: '',
    name: '',
    birthDate: null,
    gender: '',
    city: '',
    about: '',
    avatarSrc: undefined,
  },
  skill: {
    title: '',
    description: '',
    level: 1,
    category: '',
    images: [],
    tags: [],
    isPublic: true,
  },
};

interface CreateProfilePayload {
  profile: ProfileState['profile'];
  skill: ProfileState['skill'];
}

interface UpdateProfilePayload {
  email?: string;
  name?: string;
  birthDate?: Date | null;
  gender?: string;
  city?: string;
  about?: string;
  avatarSrc?: string;
}

interface UpdateProfileSkillPayload {
  title?: string;
  description?: string;
  level?: number;
  category?: string;
  images?: ProfileImage[];
  tags?: string[];
  isPublic?: boolean;
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    createProfile: (state, action: PayloadAction<CreateProfilePayload>) => {
      state.profile = action.payload.profile;
      state.skill = action.payload.skill;
    },

    updateProfile: (state, action: PayloadAction<UpdateProfilePayload>) => {
      if (action.payload.email !== undefined) {
        state.profile.email = action.payload.email;
      }
      if (action.payload.name !== undefined) {
        state.profile.name = action.payload.name;
      }
      if (action.payload.birthDate !== undefined) {
        state.profile.birthDate = action.payload.birthDate;
      }
      if (action.payload.gender !== undefined) {
        state.profile.gender = action.payload.gender;
      }
      if (action.payload.city !== undefined) {
        state.profile.city = action.payload.city;
      }
      if (action.payload.about !== undefined) {
        state.profile.about = action.payload.about;
      }
      if (action.payload.avatarSrc !== undefined) {
        state.profile.avatarSrc = action.payload.avatarSrc;
      }
    },

    updateProfileSkill: (state, action: PayloadAction<UpdateProfileSkillPayload>) => {
      if (action.payload.title !== undefined) {
        state.skill.title = action.payload.title;
      }
      if (action.payload.description !== undefined) {
        state.skill.description = action.payload.description;
      }
      if (action.payload.level !== undefined) {
        state.skill.level = action.payload.level;
      }
      if (action.payload.category !== undefined) {
        state.skill.category = action.payload.category;
      }
      if (action.payload.images !== undefined) {
        state.skill.images = action.payload.images;
      }
      if (action.payload.tags !== undefined) {
        state.skill.tags = action.payload.tags;
      }
      if (action.payload.isPublic !== undefined) {
        state.skill.isPublic = action.payload.isPublic;
      }
    },
  },
});

export const { createProfile, updateProfile, updateProfileSkill } = profileSlice.actions;

export default profileSlice.reducer;
