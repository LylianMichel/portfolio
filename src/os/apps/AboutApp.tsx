import { profile } from "../../data/profile";

export default function AboutApp() {
    return (
        <article>
            <h1>{profile.name}</h1>

            <h1>{profile.role}</h1>

            <h1>{profile.tagline}</h1>

            <h1>{profile.location}</h1>

            <a href={profile.github}>
                Mon GitHub
            </a>
        </article>
    );
}