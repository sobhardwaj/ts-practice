interface Feature {
    enabled?: boolean;
    name: string;
    description: string;
    preferences?: Record<string, Preference>;
}

interface Preference {
    enabled?: boolean;
    name: string;
    description: string;
}

interface KnownFeature<TPreferences extends Record<string, Preference>> extends Feature {
    preferences?: TPreferences;
}

interface KnownFeatures {
    featA: KnownFeature<{ 'test': Preference }>;
}

type SavedFeatures = {
    [key in keyof KnownFeatures]: Pick<Feature, 'enabled'> & {
        preferences: {
            [innerKey in keyof KnownFeatures[key]['preferences']]: Pick<Preference, 'enabled'>
        }
    }
}
//suggestion if Preference is optional
type SavedFeatures = {
    [key in keyof KnownFeatures]: Pick<Feature, 'enabled'> & {
        preferences: {
            [innerKey in keyof Exclude<KnownFeatures[key]['preferences'], undefined>]: Pick<Preference, 'enabled'>
        }
    }
}

const appKnownFeatures: KnownFeatures = {
    featA: {
        enabled: false,
        name: "someFeat",
        description: "some feature",
        preferences: {
            test: {
                enabled: true,
                name: "test pref",
                description: "testing the prefs"
            }
        }
    }
};

const teamKnownFeatures: SavedFeatures = {
    featA: {
        enabled: true,
        preferences: {
            asfdsafd: {
                enabled: true
            }
        }
    }
}