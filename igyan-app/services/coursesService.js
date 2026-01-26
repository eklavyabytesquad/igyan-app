/**
 * Courses Service - Fetch courses from Google Sheets API
 */

const SHEET_ID = '1_YOUR_SHEET_ID_HERE'; // Replace with your Google Sheet ID
const API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with your Google API Key

// Google Sheets API endpoint
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values`;

/**
 * Fetch all courses from Google Sheets
 * Expected Sheet Structure:
 * Column A: Course ID
 * Column B: Title
 * Column C: Description  
 * Column D: Category
 * Column E: Duration
 * Column F: Price
 * Column G: Thumbnail URL
 * Column H: Module 1 PDF (English) - Google Drive Link
 * Column I: Module 1 PDF (Hindi) - Google Drive Link
 * Column J: Module 2 PDF (English) - Google Drive Link
 * Column K: Module 2 PDF (Hindi) - Google Drive Link
 * Column L: Module 3 Video (English) - Google Drive Link
 * Column M: Module 3 Video (Hindi) - Google Drive Link
 */
export const fetchCourses = async () => {
  // If API keys not configured, return empty array (will use mock data)
  if (SHEET_ID === '1_YOUR_SHEET_ID_HERE' || API_KEY === 'YOUR_GOOGLE_API_KEY') {
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/Courses!A2:M?key=${API_KEY}`
    );
    
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    
    if (!data.values || data.values.length === 0) {
      return [];
    }

    // Transform sheet data to course objects
    const courses = data.values.map((row) => ({
      id: row[0] || '',
      title: row[1] || '',
      description: row[2] || '',
      category: row[3] || 'General',
      duration: row[4] || '',
      price: row[5] || 'Free',
      thumbnail: row[6] || '📚',
      progress: 0, // User-specific progress should come from backend
      modules: {
        module1English: row[7] || '',
        module1Hindi: row[8] || '',
        module2English: row[9] || '',
        module2Hindi: row[10] || '',
        module3English: row[11] || '',
        module3Hindi: row[12] || '',
      }
    }));

    return courses;
  } catch (error) {
    // Silently fail and return empty array (will use mock data)
    return [];
  }
};

/**
 * Fetch single course details by ID
 */
export const fetchCourseById = async (courseId) => {
  try {
    // Try to fetch from API first
    let courses = await fetchCourses();
    
    // If API returns empty, use mock data
    if (!courses || courses.length === 0) {
      courses = mockCourses;
    }
    
    return courses.find(course => course.id === courseId) || null;
  } catch (error) {
    console.error('Error fetching course:', error);
    // Fallback to mock data on error
    return mockCourses.find(course => course.id === courseId) || null;
  }
};

/**
 * Extract Google Drive file ID from URL
 */
export const extractDriveFileId = (url) => {
  if (!url) return null;
  const match = url.match(/\/file\/d\/([^\/]+)/);
  return match ? match[1] : null;
};

/**
 * Get file ID for any module URL
 */
export { extractDriveFileId as getFileId };

/**
 * Convert Google Drive URL to embeddable preview URL
 */
export const getGoogleDrivePreviewUrl = (url) => {
  const fileId = extractDriveFileId(url);
  if (!fileId) return null;
  return `https://drive.google.com/file/d/${fileId}/preview`;
};

/**
 * Course data - Real courses with Google Drive links
 */
export const mockCourses = [
  {
    id: 'base-layer',
    title: 'Base Layer',
    description: 'Essential life skills, financial literacy, and foundational knowledge for success',
    category: 'Foundation',
    duration: '3 modules',
    price: 'Free',
    thumbnail: '🎯',
    progress: 0,
    modules: {
      module1English: 'https://drive.google.com/file/d/18wbzZ9RN1QE2zN4zwnZ03vNeL_lXC9Zg/view?usp=drive_link',
      module2English: 'https://drive.google.com/file/d/1ItN8tM6FTWw2gDHZOyCQ-wp0Xdhgyy9A/view?usp=sharing',
      module1Hindi: 'https://drive.google.com/file/d/18zsKcJgVbFLfNMN0hQMlVGGWMqB5Qp06/view?usp=drive_link',
      module2Hindi: 'https://drive.google.com/file/d/1r5iX2AjP3xLDDHiiSy9LJZDhsdtGxkp3/view?usp=drive_link',
      module3English: 'https://drive.google.com/file/d/1BnyaZKZcabxpUmT6f0thphsNUQmDRbG3/view?usp=sharing',
      module3Hindi: 'https://drive.google.com/file/d/10cZw2Ar8gfSNy5U0QdwLKzHuqrpd5MT4/view?usp=sharing',
    }
  },
  {
    id: 'everyday-tech',
    title: 'Everyday Tech',
    description: 'Master everyday technology tools and digital skills for modern life',
    category: 'Foundation',
    duration: '3 modules',
    price: 'Free',
    thumbnail: '💻',
    progress: 0,
    modules: {
      module1English: 'https://drive.google.com/file/d/1iKOBrL8NzFhuitm3J0AL1PIwuZW9Uroc/view?usp=drive_link',
      module2English: 'https://drive.google.com/file/d/19VkrybLK1LdMvOF5hotDJvfse6oNoaZQ/view?usp=drive_link',
      module1Hindi: 'https://drive.google.com/file/d/1oTqd0z2GULBRm_1n9_8alUxtw_yLgbGp/view?usp=drive_link',
      module2Hindi: 'https://drive.google.com/file/d/1oCMrzeNd_0i-77afQX3PSSIf1_STrSEK/view?usp=drive_link',
      module3English: 'https://drive.google.com/file/d/1nxcpSFHTxbyDvwYPO5u353ztBUqz4Cax/view?usp=sharing',
      module3Hindi: 'https://drive.google.com/file/d/1oTqd0z2GULBRm_1n9_8alUxtw_yLgbGp/view?usp=sharing',
    }
  },
  {
    id: 'hustle-and-earn',
    title: 'Hustle and Earn',
    description: 'Learn practical strategies to start earning money and build your income streams',
    category: 'Business',
    duration: '3 modules',
    price: 'Free',
    thumbnail: '💰',
    progress: 0,
    modules: {
      module1English: 'https://drive.google.com/file/d/1VKsegGXI3aL81gev1XcxZee0unuPTzYN/view?usp=drive_link',
      module2English: 'https://drive.google.com/file/d/1VZpINhlGwjmH0K759WVBOvceJ33zO_JF/view?usp=drive_link',
      module1Hindi: 'https://drive.google.com/file/d/1aiOkrYdApO6CxXdlHOgj8uM2-R_SfAYv/view?usp=sharing',
      module2Hindi: 'https://drive.google.com/file/d/1kHWXhgMJRoDbttGpiVGYsV_JGVMI0VXV/view?usp=drive_link',
      module3English: 'https://drive.google.com/file/d/1FFGIKPPd71DbUjK_7t_014vFGSd2jrxS/view?usp=sharing',
      module3Hindi: 'https://drive.google.com/file/d/1PtYEDFCoqdtAYJ9Wl8pr3I6fRikorCpe/view?usp=sharing',
    }
  },
  {
    id: 'professional-edge',
    title: 'Professional Edge',
    description: 'Develop professional skills and workplace competencies for career success',
    category: 'Business',
    duration: '3 modules',
    price: 'Free',
    thumbnail: '👔',
    progress: 0,
    modules: {
      module1English: 'https://drive.google.com/file/d/1v-pJfuGHHzb5JhTrXmv3F_DiM25SeBVF/view?usp=drive_link',
      module2English: 'https://drive.google.com/file/d/13R_lzhLYQfdP4q2iET75SdzzjGQXlYDL/view?usp=drive_link',
      module1Hindi: 'https://drive.google.com/file/d/1rwOUiMjq98wDCiwo3jxY9m6nHPm53oQq/view?usp=drive_link',
      module2Hindi: 'https://drive.google.com/file/d/17SIHZWZojfkZASGv0IGA0kahHbdfgwZN/view?usp=drive_link',
      module3English: 'https://drive.google.com/file/d/16ex8KP0lPZ2qc4fADjDehcFpiRjToikn/view?usp=sharing',
      module3Hindi: 'https://drive.google.com/file/d/11AQF710cBedlEFKXojCS-ddHOvu67BJp/view?usp=sharing',
    }
  },
];
