import { defaults as tsjPreset } from "ts-jest/presets";

export default {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    ...tsjPreset.transform,
  },
};
