// SPDX-License-Identifier: MIT

library ArrayUtils {
    function indexOf(address[] storage array, address element) internal view returns (int256) {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == element) {
                return int256(i);
            }
        }
        return -1;
    }

    function remove(address[] storage array, uint256 index) internal {
        if (index >= array.length) return;

        for (uint256 i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
        array.pop();
    }
}