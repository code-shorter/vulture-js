declare module "vulture-js" {
    export function connect(formId: string): void;
    export function multiConnect(formIds: string[]): void;
    export function talon(options: { strict?: boolean; render_error?: boolean }): { fields: any; errors: any };
    export function talonAll(index: number, options: { strict?: boolean; render_error?: boolean }): { formId: string; fields: any; errors: any };
    export function formatter(data: any[]): { [key: string]: any };
}
