/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface WebpackBundleOptions {
    /**
     * 设置发布的库为 library.js 还是 library.min.js
     */
    libraryType: 'debug' | 'release';
    /**
     * 编译宏常量定义
     */
    defines?: {
        [k: string]: unknown;
    };
    /**
     * TypeScript 相关配置
     */
    typescript: {
        /**
         * 编译模式
         * modern 模式为完全ES6 Module的方式，底层实现采用 ts-loader。
         * legacy 模式为兼容现有代码的方式，底层在执行 ts-loader 之前先进行了其他内部处理
         */
        mode?: 'legacy' | 'modern';
        /**
         * 编译采用的 tsconfig.json 路径，默认为 tsconfig.json
         */
        tsconfigPath?: string;
    };
    html?: {
        templateFilePath?: string;
    };
    parseEgretProperty?: boolean;
    /**
     * 是否启动 EXML 相关功能
     */
    exml?: {
        /**
         * EXML增量编译
         */
        watch?: boolean;
    };
    /**
     * 是否发布子包及子包规则
     */
    subpackages?: {
        name: string;
        matcher: (filepath: string) => boolean;
    }[];
    /**
     * 调试服务器相关功能
     */
    devServer?: {
        /**
         * 启动端口，默认值为3000
         */
        port?: number;
        /**
         * 编译完成后打开浏览器
         */
        open?: boolean;
    };
}
