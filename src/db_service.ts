import { createClient } from "@supabase/supabase-js";

export interface AnimalCount {
    fox: number;
    duck: number;
    cat: number;
}

export interface RatingData {
    id: number;
    num_ratings: number;
    rating: number;
}

export class DatabaseService {
    private supabase: any;

    constructor() {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.error('Missing Supabase environment variables');
            throw new Error('Supabase configuration is missing');
        }

        this.supabase = createClient(supabaseUrl, supabaseKey);

    }

    async getCount() {
        const { data, error } = await this.supabase.from("animal_count").select();

        if (error) {
            console.error("Error fetching animal count:", error);
            throw error;
        }

        if (!data[0]) {
            throw new Error("No animal count data found");
        }

        const output: AnimalCount = {
            fox: data[0].fox_count,
            duck: data[0].duck_count,
            cat: data[0].cat_count,
        };

        return output;
    }

    async updateCount(animalCount: AnimalCount) {
        await this.supabase
            .from("animal_count")
            .update({ fox_count: animalCount.fox, duck_count: animalCount.duck, cat_count: animalCount.cat })
            .eq("id", 1)
            .select();
    }

    async getRating(animal: 'fox' | 'duck' | 'cat') {
        const { data, error } = await this.supabase.from(`${animal}_rating`).select();

        if (error) {
            console.log("error in fetching ratings from the database");
            throw error;
        }

        if (!data[0]) {
            throw new Error("No animal rating data found");
        }

        return data[0];
    }

    async updateRating(animal: 'fox' | 'duck' | 'cat', rating: RatingData) {
        await this.supabase
            .from(`${animal}_rating`)
            .update(rating)
            .eq("id", 1)
            .select();
    }
}