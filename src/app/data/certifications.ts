import React, { useState, useEffect } from 'react';

interface Certification {
  id: string;
  name: string;
  provider: string;
  date: string;
  image: string;
  link: string;
}

export const certifications: Certification[] = [

  {
    id: 'Networking-Basics',
    name: 'Networking Basics',
    provider: 'Cisco Networking Academy',
    date: '2024-03-01',
    image: '/images/certifications/Networking-Basics.png',
    link: 'https://www.credly.com/badges/a50363eb-75ab-4afc-b31d-cbfa2ca82f40/public_url'
  },
  {
    id: 'Computer-Hardware-Basics',
    name: 'Computer Hardware Basics',
    provider: 'Cisco Networking Academy',
    date: '2024-02-28',
    image: '/images/certifications/Computer-Hardware-Basics.png',
    link: 'https://www.credly.com/badges/693c9330-7191-432d-a549-48b017db1548/public_url'
  },
  {
    id: 'Networking-Devices-Initial-Configuration',
    name: 'Networking Devices and Initial Configuration',
    provider: 'Cisco Networking Academy',
    date: '2024-03-08',
    image: '/images/certifications/Networking-Devices-Initial-Configuration.png',
    link: 'https://www.credly.com/badges/44365338-de4f-421e-867f-7438a27b81c4/public_url'
  },
  {
    id: 'Intro-to-Cybersecurity',
    name: 'Introduction to Cybersecurity',
    provider: 'Cisco Networking Academy',
    date: '2024-03-02',
    image: '/images/certifications/Intro-to-Cybersecurity.png',
    link: 'https://www.credly.com/badges/f5ca1926-463e-4c9a-82ca-1cd41cc43ac8/public_url'
  },
  {
    id: 'Data-Science-Intro',
    name: 'Introduction to Data Science',
    provider: 'Cisco Networking Academy',
    date: '2024-02-28',
    image: '/images/certifications/Data-Science-Intro.png',
    link: 'https://www.credly.com/badges/67f794e7-0093-45c9-a949-9a6784daad1e/public_url'
  },
  {
    id: 'Intro-to-IoT',
    name: 'Introduction to IoT',
    provider: 'Cisco Networking Academy',
    date: '2024-03-02',
    image: '/images/certifications/Intro-to-IoT.png',
    link: 'https://www.credly.com/badges/9312350e-be71-4512-a815-1d63d32c4045/public_url'
},
{
  id: 'Packet-Tracer-Intro',
  name: 'Introduction to Packet Tracer',
  provider: 'Cisco Networking Academy',
  date: '2024-02-28',
  image: '/images/certifications/Packet-Tracer-Intro.png',
  link: 'https://www.credly.com/badges/5afc9f09-d59d-43cc-b195-585b6da5cd72/public_url'
},
  // Add more certifications here
]; 
