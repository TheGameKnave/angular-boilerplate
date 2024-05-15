export const thresholds = {
    pageLoad: 20,
    memory: 80000000
}
export function getThreshold(thresholdKey: string){
    return thresholds[thresholdKey] * 1.2;
}