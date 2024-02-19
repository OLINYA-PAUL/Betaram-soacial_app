import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"



import Home from "./_root/pages/Home";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";

import Explore from '../src/_root/pages/Explore'
import Saved from '../src/_root/pages/Saved'
import AllUsers from '../src/_root/pages/AllUsers'
import CreatePost from '../src/_root/pages/CreatePost'
import EditPost from '../src/_root/pages/EditPost'
import Profile from '../src/_root/pages/Profile'
import PostDetails from '../src/_root/pages/PostDetails'
import UpdateProfile from '../src/_root/pages/Profile'


import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/sign-in" element={<SigninForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>

      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
