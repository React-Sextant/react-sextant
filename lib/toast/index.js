import React from 'react';
import RootView from './RootView'

export default class Toast{

    static show(node) {
        RootView.setView(
            {node}
        )
    }

    static hide() {
        RootView.setView()
    }
}
