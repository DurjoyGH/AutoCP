# Test Case Generator Implementation

## Overview
Implemented a complete test case generation system using Gemini AI (GEMINI_API_KEY_TEST_CASE_GENERATOR) that generates 10 diverse test cases for competitive programming problems.

## Implementation Details

### 1. AI Service (`backend/services/aiTestcaseService.js`)
- Uses `GEMINI_API_KEY_TEST_CASE_GENERATOR` from environment variables
- Generates exactly 10 test cases categorized as:
  - **3 Base Cases**: Simple, straightforward test scenarios
  - **4 Edge Cases**: Boundary conditions, corner cases, special scenarios
  - **3 Large Cases**: Maximum constraint inputs, stress tests
- Each test case includes:
  - `type`: Category (base/edge/large)
  - `input`: Test input
  - `output`: Expected output
  - `explanation`: Clear description of what the test case covers
- Prompt includes:
  - Problem statement
  - Problem description
  - Constraints
  - Time complexity
  - Space complexity

### 2. Database Model (`backend/models/testcase.js`)
- Stores generated test cases linked to problems and users
- Schema fields:
  - `problemId`: Reference to Problem
  - `userId`: Reference to User
  - `testcases`: Array of testcase objects
  - `generatedAt`: Timestamp
- Unique index on (problemId, userId) to prevent duplicates

### 3. Controller (`backend/controllers/generateTestcaseController.js`)
Four main endpoints:
- **POST /api/generate-testcase/generate/:problemId**
  - Generates test cases for a problem
  - Returns existing testcases if already generated
  
- **GET /api/generate-testcase/:problemId**
  - Retrieves stored test cases for a problem
  
- **DELETE /api/generate-testcase/:problemId**
  - Deletes test cases for a problem
  
- **PUT /api/generate-testcase/regenerate/:problemId**
  - Regenerates test cases (updates existing or creates new)

All responses are in YAML format for consistency.

### 4. Routes (`backend/routes/generateTestcaseRoutes.js`)
- All routes require authentication (authMiddleware)
- Registered at `/api/generate-testcase`
- Integrated into main app in `backend/index.js`

### 5. Frontend API Service (`frontend/src/services/generateTestcaseApi.js`)
Already exists with four functions:
- `generateTestcases(problemId)`: Generates test cases
- `getTestcases(problemId)`: Fetches test cases
- `deleteTestcases(problemId)`: Deletes test cases
- `regenerateTestcases(problemId)`: Regenerates test cases

## API Usage Example

### Generate Test Cases
```javascript
POST /api/generate-testcase/generate/:problemId
Authorization: Bearer <token>

Response:
{
  success: true,
  message: "Test cases generated successfully",
  data: {
    _id: "...",
    problemId: "...",
    userId: "...",
    testcases: [
      {
        type: "base",
        input: "...",
        output: "...",
        explanation: "..."
      },
      // ... 9 more testcases
    ],
    generatedAt: "2025-12-03T..."
  }
}
```

## Test Case Categories

### Base Cases (3)
- Simple, straightforward inputs
- Basic scenarios that cover typical usage
- Easy to understand and verify

### Edge Cases (4)
- Boundary conditions (min/max values)
- Empty inputs or single elements
- Special conditions mentioned in constraints
- Corner cases that might break naive solutions

### Large Cases (3)
- Inputs near maximum constraints
- Stress tests for performance
- Tests time and space complexity limits

## Environment Variable
```env
GEMINI_API_KEY_TEST_CASE_GENERATOR=AIzaSyDLBjlXt1sks63VsJ6QLtHvZEk9qPDkwE4
```

## Testing
Run the test script to verify the implementation:
```bash
cd backend
node test-testcase-service.js
```

## Key Features
1. ✅ Uses dedicated Gemini API key for test case generation
2. ✅ Generates exactly 10 diverse test cases
3. ✅ Categorizes test cases by type (base, edge, large)
4. ✅ Includes problem statement, constraints, and complexity in prompt
5. ✅ YAML format for consistency with other services
6. ✅ Full CRUD operations (Create, Read, Delete, Regenerate)
7. ✅ Authenticated routes
8. ✅ Database persistence
9. ✅ Error handling and validation
10. ✅ Frontend API integration ready

## Files Created/Modified
- ✅ `backend/services/aiTestcaseService.js` - AI service for generation
- ✅ `backend/models/testcase.js` - Database model
- ✅ `backend/controllers/generateTestcaseController.js` - API controllers
- ✅ `backend/routes/generateTestcaseRoutes.js` - Route definitions
- ✅ `backend/index.js` - Added testcase routes
- ✅ `backend/test-testcase-service.js` - Test script
- ℹ️ `frontend/src/services/generateTestcaseApi.js` - Already exists

## Next Steps
The implementation is complete and ready to use. You can:
1. Test the service using the test script
2. Integrate with the frontend UI to display test cases
3. Add test case execution/validation features if needed
