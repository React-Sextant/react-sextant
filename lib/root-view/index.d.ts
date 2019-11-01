/// <reference types="react" />
import React from 'react';

export default class RootView extends React.Component<any> {
    static setView(element:JSX.Element): void;
    static hide(): void;
}
