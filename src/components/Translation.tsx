import { Box, FormControl, InputLabel, Select,MenuItem } from '@mui/material'

function Translation() {
    return (
        <Box sx={{marginRight:'1rem',width:'200px'}}>
            <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-label">Site Language</InputLabel>
                <Select>
                    <MenuItem value='en'>English</MenuItem>
                    <MenuItem value='hi'>Hindi</MenuItem>
                    <MenuItem value='ur'>Urdu</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )

}
export default Translation