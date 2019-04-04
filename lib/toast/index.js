import React from 'react';
import RootView from './RootView'

export default class Toast{

    static show(node) {
        RootView.setView(
            {node}
        )
    }

    static loading(progress,duration) {
        RootView.setLoading(progress,duration)
    }

    static hide() {
        RootView.setView();
        RootView.setLoading(0)
    }
}
