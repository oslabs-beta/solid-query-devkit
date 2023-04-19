# Solid Query Devkit

Solid Query Devkit is a developer tool for Solid Query that allows you to view and explore query data and metadata while providing additional functionality like manual refetching, invalidating, and removing.

# How To Use

- NPM install this package into a SolidJS project that uses Tanstack Solid Query.
- import SolidQueryDevkit from 'solid-query-devkit' into the file where you're wrapping your application with the <QueryClientProvider>
- mount <SolidQueryDevkit /> as high in your app as your can - the closer it is to the root of the page, the better! 
- just ensure that the <SolidQueryDevkit /> component is inside of the Solid Query <QueryClientProvider> wrapper