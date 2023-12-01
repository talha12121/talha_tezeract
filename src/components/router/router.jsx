import { BrowserRouter, Route, Routes } from 'react-router-dom'


import React from 'react';
import { Index, UserForm, UserTable } from '../pages';

function Router() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Index />} />
                    <Route path='/userform' element={<UserForm />} />
                    <Route path='/usertable' element={<UserTable />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Router;