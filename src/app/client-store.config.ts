/**
 * @author RajaSekhar
 * @description configuration for persisting application
 * data on client side, for localforage.
 */

 import * as localforage from 'localforage';

 export const clientStoreConfig = {
     name: 'FalconAI',
     storeName: 'clientstore',
     driver: [
         localforage.INDEXEDDB,
         localforage.WEBSQL,
         localforage.LOCALSTORAGE
     ],
     version: 1,
     description: 'FalconAI client db'
 };
 