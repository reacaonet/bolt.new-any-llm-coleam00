/**
 * A utility to match glob patterns in the browser
 * Supports basic glob features like * and **
 */
export function isMatch(path: string, pattern: string): boolean {
    // Convert glob pattern to regex
    const regex = pattern
        // Escape special regex characters except * and /
        .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
        // Replace ** with special marker
        .replace(/\*\*/g, '{{GLOBSTAR}}')
        // Replace single * with non-slash matcher
        .replace(/\*/g, '[^/]*')
        // Replace globstar marker with proper pattern
        .replace(/{{GLOBSTAR}}/g, '.*')
        // Anchor pattern to full path match
        .replace(/^/, '^')
        .replace(/$/, '$');

    return new RegExp(regex).test(path);
}

/**
 * Match multiple patterns against a path
 */
export function matchPatterns(path: string, patterns: string[]): boolean {
    return patterns.some(pattern => isMatch(path, pattern));
}