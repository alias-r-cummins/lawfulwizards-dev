import { type StyleValueJSON } from './BridgeValue';
import { AllLayerStyleProps } from './MapboxStyles';
export declare type StyleValue = {
    styletype: string;
    stylevalue: StyleValueJSON;
};
export declare function transformStyle(style: AllLayerStyleProps | undefined): undefined | {
    [key: string]: StyleValue;
};
//# sourceMappingURL=StyleValue.d.ts.map