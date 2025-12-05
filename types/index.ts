export interface Surah {
    id: number;
    name_simple: string;
    name_arabic: string;
    verses_count: number;
    revelation_place?: string;
    translated_name?: {
        name: string;
        language_name: string;
    };
}

export interface Verse {
    id: number;
    verse_key: string;
    text_uthmani: string;
    translations?: {
        id: number;
        resource_id: number;
        text: string;
    }[];
}

export interface TafsirResponse {
    tafsir: {
        text: string;
        resource_name: string;
    };
}

export interface AudioResponse {
    audio_file: {
        audio_url: string;
    };
}
