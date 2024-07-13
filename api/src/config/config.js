export const config = {
    db: {
        DB_HOST: Deno.env.get('DB_HOST'),
        DB_USER: Deno.env.get('DB_USER'),
        DB_PASSWORD: Deno.env.get('DB_PASSWORD'),
        DB_NAME: Deno.env.get("DB_NAME"),
        DB_PORT: Deno.env.get("DB_PORT")
    },
    api: {
        API_KEY: Deno.env.get('API_KEY'),
        PORT: Deno.env.get('PORT'),
        NDOE_ENV: Deno.env.get("NDOE_ENV")
    }
}