import {ConformanceModels} from '../../components/Conformance';

export class ConformanceResourceStatus {

    public codeSystem: Object = {
        concept: [
            {
                abstract: true,
                code: 'draft',
                display: 'string'
            },
            {
                abstract: true,
                code: 'active',
                display: 'string'
            },
            {
                abstract: true,
                code: 'retired',
                display: 'string'
            }
        ],
        system: process.env.DOMAIN + '/Valueset/ConformanceResourceStatus',
        version: '1.0.0'
    };

}

export const conformanceResourceStatus: ConformanceResourceStatus = new ConformanceModels.Valueset(new ConformanceResourceStatus());