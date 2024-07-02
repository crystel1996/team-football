export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const IsValidEmail = (email: string) => {
    return email.match(EMAIL_REGEX);
}