/// <reference types="react" />
import React from 'react';

export default class RootView extends React.Component<any> {
    static setView(element:JSX.Element): void;
    static hide(): void;
    static add(element:JSX.Element): void;
    static remove(index:number): void;
}
