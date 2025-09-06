module.exports = {

"[project]/tailwind.config.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const __TURBOPACK__default__export__ = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            backgroundColor: {
                primary: "rgba(var(--bg-primary))",
                secondary: "rgba(var(--bg-secondary))",
                tertiary: "rgba(var(--bg-tertiary))",
                disabled: "rgba(var(--bg-disabled))",
                component: {
                    DEFAULT: "rgba(var(--bg-component-primary))",
                    hover: "rgba(var(--bg-component-primary-hover))",
                    secondary: {
                        DEFAULT: "rgba(var(--bg-component-secondary))",
                        hover: "rgba(var(--bg-component-secondary-hover))"
                    }
                },
                action: {
                    DEFAULT: "rgba(var(--bg-action-primary))",
                    hover: "rgba(var(--bg-action-primary-hover))",
                    pressed: "rgba(var(--bg-action-primary-pressed))",
                    secondary: {
                        DEFAULT: "var(--bg-action-secondary)",
                        hover: "var(--bg-action-secondary-hover)",
                        pressed: "var(--bg-action-secondary-pressed)"
                    },
                    tertiary: {
                        DEFAULT: "var(--bg-action-tertiary)",
                        hover: "var(--bg-action-tertiary-hover)",
                        pressed: "var(--bg-action-tertiary-pressed)"
                    }
                },
                positive: {
                    DEFAULT: "rgba(var(--bg-positive-primary))",
                    hover: "rgba(var(--bg-positive-primary-hover))",
                    pressed: "rgba(var(--bg-positive-primary-pressed))",
                    secondary: {
                        DEFAULT: "rgba(var(--bg-positive-secondary))",
                        hover: "rgba(var(--bg-positive-secondary-hover))",
                        pressed: "rgba(var(--bg-positive-secondary-pressed))"
                    }
                },
                negative: {
                    DEFAULT: "rgba(var(--bg-negative-primary))",
                    hover: "rgba(var(--bg-negative-primary-hover))",
                    pressed: "rgba(var(--bg-negative-primary-pressed))",
                    secondary: {
                        DEFAULT: "rgba(var(--bg-negative-secondary))",
                        hover: "rgba(var(--bg-negative-secondary-hover))",
                        pressed: "rgba(var(--bg-negative-secondary-pressed))"
                    }
                },
                warning: {
                    DEFAULT: "rgba(var(--bg-warning-primary))",
                    hover: "rgba(var(--bg-warning-primary-hover))",
                    pressed: "rgba(var(--bg-warning-primary-pressed))",
                    secondary: {
                        DEFAULT: "rgba(var(--bg-warning-secondary))",
                        hover: "rgba(var(--bg-warning-secondary-hover))",
                        pressed: "rgba(var(--bg-warning-secondary-pressed))"
                    }
                }
            },
            colors: {
                primary: "rgba(var(--content-primary))",
                secondary: "rgba(var(--content-secondary))",
                tertiary: "rgba(var(--content-tertiary))",
                disabled: "rgba(var(--content-disabled))",
                action: {
                    DEFAULT: "rgba(var(--content-action-primary))",
                    hover: "rgba(var(--content-action-primary-hover))",
                    pressed: "rgba(var(--content-action-primary-pressed))",
                    on: {
                        primary: "rgba(var(--content-action-on-primary))",
                        secondary: "rgba(var(--content-action-on-secondary))",
                        tertiary: "rgba(var(--content-action-on-tertiary))"
                    }
                },
                positive: {
                    DEFAULT: "rgba(var(--content-positive-primary))",
                    on: {
                        primary: "rgba(var(--content-positive-on-primary))",
                        secondary: "rgba(var(--content-positive-on-secondary))"
                    }
                },
                negative: {
                    DEFAULT: "rgba(var(--content-negative-primary))",
                    on: {
                        primary: "rgba(var(--content-negative-on-primary))",
                        secondary: "rgba(var(--content-negative-on-secondary))"
                    }
                },
                warning: {
                    DEFAULT: "rgba(var(--content-warning-primary))",
                    on: {
                        primary: "rgba(var(--content-warning-on-primary))",
                        secondary: "rgba(var(--content-warning-on-secondary))"
                    }
                }
            },
            borderColor: {
                DEFAULT: "rgba(var(--border-primary))",
                secondary: "rgba(var(--border-secondary))",
                action: "rgba(var(--border-action))",
                negative: {
                    DEFAULT: "rgba(var(--border-negative-primary))",
                    secondary: "rgba(var(--border-negative-secondary))"
                },
                positive: {
                    DEFAULT: "rgba(var(--border-positive-primary))",
                    secondary: "rgba(var(--border-positive-secondary))"
                },
                warning: {
                    DEFAULT: "rgba(var(--border-warning-primary))",
                    secondary: "rgba(var(--border-warning-secondary))"
                },
                disabled: "rgba(var(--border-disabled))"
            },
            borderRadius: {
                xs: "4px",
                sm: "8px",
                md: "16px",
                full: "1000px"
            },
            fill: {
                primary: "rgba(var(--content-action-on-primary))",
                secondary: "rgba(var(--content-action-on-secondary))",
                disabled: "rgba(var(--content-disabled))"
            }
        }
    },
    plugins: []
};
}}),

};

//# sourceMappingURL=tailwind_config_ts_b1804c._.js.map